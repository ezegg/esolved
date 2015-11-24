<?php

class MateriaController extends \BaseController {

	public function createClass()
  {
    $rules = array(
        'nombre'           => 'String|required|unique:materias',
        'creditos'         => 'numeric|required',
        'hora_inicio'      => 'required',
        'hora_fin'         => 'required'
    );

    $messages = array(
      'nombre.unique'                => 'The class name already exists.',
      'nombre.required'              => 'The class name is required.',
      'creditos.required'            => 'The credits is required.',
      'hora_inicio.required'         => 'The start Date is required.',
      'hora_fin.required'            => 'The end Date is required.'
    );

    $validation = Validator::make(Input::all(), $rules, $messages);

    if ($validation->fails())
    {

        return Redirect::to('dash')->withErrors($validation);

    }else{


        $newTarea = Materia::create(Input::all());
        $newTarea->save();
        return Redirect::back();
    }

  }


}
