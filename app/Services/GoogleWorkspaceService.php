<?php
namespace App\Services;

use Google\Service\Directory;
use Google\Client;

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
        $user = new Directory\User([
            'primaryEmail' => $pendaftaran->email,
            'name' => [
                'givenName'  => $pendaftaran->first_name,
                'familyName' => $pendaftaran->last_name,
            ],
            'password' => 'PasswordAwal123!', // bisa diganti random generator
        ]);

        return $this->service->users->insert($user);
    }
}
