<?php

namespace App\Services;

use Google\Client;
use Illuminate\Support\Facades\Crypt;
use Google\Service\Directory\User as GoogleUser;

class GoogleWorkspaceService
{
    protected $service;

    public function __construct()
    {
        $client = new \Google\Client();
        $client->setAuthConfig(storage_path('app/google/service-account.json'));
        $client->addScope(\Google\Service\Directory::ADMIN_DIRECTORY_USER);

        // 🔹 impersonasi super admin domain
        $client->setSubject('hadi@sbh.ac.id');

        $this->service = new \Google\Service\Directory($client);
    }


    public function createUser($pendaftaran)
    {
        // decrypt password dari database
        $password = Crypt::decryptString($pendaftaran->password);

        $user = new GoogleUser([
            'primaryEmail' => $pendaftaran->email,
            'name' => [
                'givenName'  => $pendaftaran->first_name,
                'familyName' => $pendaftaran->last_name,
            ],
            'password' => $password,
        ]);

        return $this->service->users->insert($user);
    }
}
