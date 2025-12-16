<?php

namespace App\Services;

use Google\Client;
use Illuminate\Support\Facades\Crypt;
use Google\Service\Directory\User as GoogleUser;
use Google\Service\Directory;

class GoogleWorkspaceService
{
    protected $service;

    public function __construct()
    {
        $client = new Client();
        $client->setApplicationName('Laravel Google Workspace Provisioning');
        $client->setAuthConfig(storage_path('app/google/service-account.json'));
        $client->setScopes([
            Directory::ADMIN_DIRECTORY_USER,
        ]);
        $client->setSubject('hadi@sbh.ac.id'); // super admin

        $this->service = new Directory($client);
    }

    // ⬇️ INI WAJIB ADA
    public function testAuth()
    {
        return $this->service->users->listUsers([
            'customer' => 'my_customer',
            'maxResults' => 1,
        ]);
    }

    public function createUser($pendaftaran)
    {
        if (empty($pendaftaran->password)) {
            throw new \Exception('Password kosong');
        }

        $user = new GoogleUser([
            'primaryEmail' => $pendaftaran->email,
            'name' => [
                'givenName'  => $pendaftaran->first_name,
                'familyName' => $pendaftaran->last_name,
            ],
            'password' => $pendaftaran->password, // ⬅️ PLAIN
            // 'changePasswordAtNextLogin' => true,
        ]);

        return $this->service->users->insert($user);
    }
}
