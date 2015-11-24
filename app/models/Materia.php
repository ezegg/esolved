<?php
class Materia extends Eloquent {
	protected $fillable = ['nombre','creditos','hora_inicio', 'hora_fin','obligatorio'];
	public $timestamps = false;


    /*public function user()
    {
    	return $this->belongsTo('User');
    }*/

}
