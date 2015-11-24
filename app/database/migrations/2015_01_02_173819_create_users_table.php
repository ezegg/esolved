<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('username')->unique();
			$table->string('email')->unique();
			$table->string('password');
			$table->rememberToken();
			$table->string('avatar_file_name')->nullable();
			$table->integer('avatar_file_size')->nullable();
			$table->string('avatar_content_type')->nullable();
			$table->timestamp('avatar_updated_at')->nullable();
			$table->timestamps();
		});


	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{

		Schema::drop('users');
	}

}
