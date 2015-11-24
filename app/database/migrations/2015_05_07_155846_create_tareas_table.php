<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTareasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create('materias', function(Blueprint $table) {

			$table->increments('id')->unsigned();
			$table->String('nombre')->nullable()->unique();
			$table->string('creditos')->nullable();
			$table->time('hora_inicio')->nullable();
			$table->time('hora_fin')->nullable();
			$table->boolean('obligatorio')->nullable();
			/*$table->integer('user_id')->unsigned();
      $table->foreign('user_id')->references('id')->on('users');*/

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('materias');
	}

}
