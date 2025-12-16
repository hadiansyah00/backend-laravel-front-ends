<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PendaftaranEmail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;
use App\Services\GoogleWorkspaceService;


class PendaftaranEmailController extends Controller
{


    public function create()
    {
        return view('pendaftaran_email.create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name'  => 'required|string|max:50',
            'program_studi' => 'nullable|string|max:100',
            'phone'         => 'nullable|string|max:20',
        ]);

        $email = strtolower(
            trim($request->first_name) . '.' . trim($request->last_name)
        ) . '@sbh.ac.id';

        if (PendaftaranEmail::where('email', $email)->exists()) {
            return back()->withErrors([
                'email' => "Email sudah terdaftar: {$email}"
            ]);
        }

        // 🔑 generate password PLAIN
        $plainPassword = ucfirst($request->first_name) . date('Y') . '@Sbh';
        // ✅ SIMPAN PLAIN TEXT
        $pendaftaran = PendaftaranEmail::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'program_studi' => $request->program_studi,
            'phone'         => $request->phone,
            'email'      => $email,
            'password'   => $plainPassword, // ⬅️ PLAIN
            'status'     => 'pending',
        ]);

        try {
            app(GoogleWorkspaceService::class)
                ->createUser($pendaftaran);

            $pendaftaran->update(['status' => 'created']);

            return back()->with(
                'success',
                "Akun berhasil dibuat: {$email}"
            );
        } catch (\Exception $e) {
            $pendaftaran->update(['status' => 'failed']);
            return back()->withErrors([
                'google' => $e->getMessage()
            ]);
        }
    }


    public function index()
    {
        $pendaftaran = PendaftaranEmail::latest()->paginate(10);

        return view('admin.pendaftaran_email.index', compact('pendaftaran'));
    }

    /**
     * ADMIN: Detail pendaftaran email
     */
    public function show($id)
    {
        $data = PendaftaranEmail::findOrFail($id);
        return response()->json($data);
    }


    /**
     * ADMIN: Hapus data pendaftaran
     */
    public function destroy($id)
    {
        $data = PendaftaranEmail::findOrFail($id);
        $data->delete();

        return redirect()->route('admin.pendaftaran-email.index')->with('success', 'Data berhasil dihapus.');
    }
}
