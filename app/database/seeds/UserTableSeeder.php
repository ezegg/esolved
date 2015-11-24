<?php


class UserTableSeeder extends Seeder {

	public function run()
	{
		User::create([
			'first_name' => 'Ezequiel',
			'last_name'  => 'Gonzalez',
			'username'   => 'eze',
			'email'      => 'ezeezegg@gmail.com',
			'password'   => 'admin'
			//'password'   =>  Hash::make('admin')
			]);
		}


	}
