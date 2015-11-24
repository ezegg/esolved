<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

use Codesleeve\Stapler\ORM\StaplerableInterface;
use Codesleeve\Stapler\ORM\EloquentTrait;

class User extends Eloquent implements UserInterface, RemindableInterface, StaplerableInterface {

	use UserTrait, RemindableTrait, EloquentTrait;

	protected $fillable = ['first_name','last_name','username','email','password','avatar'];

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	public function __construct(array $attributes = array()) {
		$this->hasAttachedFile('avatar', [
			'styles' => [
				'medium' => '300x300',
				'thumb' => '100x100'
				]
				]);

				parent::__construct($attributes);
			}

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	public function setPasswordAttribute($value)
	{
		$this->attributes['password'] = Hash::make($value);
	}

	public function getAuthPassword()
	{
		return $this->password;
	}


	protected $hidden = array('password', 'remember_token');

	public function materias()
    {
        return $this->has_many('Materia');
    }

    /**
     * Get the roles a user has
     */
    public function roles()
    {
        return $this->belongsToMany('Role', 'users_roles');
    }

    /**
     * Find out if User is an employee, based on if has any roles
     *
     * @return boolean
     */
    public function isEmployee()
    {
        $roles = $this->roles->toArray();
        return !empty($roles);
    }

    /**
     * Find out if user has a specific role
     *
     * $return boolean
     */
    public function hasRole($check)
    {
        return in_array($check, array_fetch($this->roles->toArray(), 'name'));
    }

    /**
     * Get key in array with corresponding value
     *
     * @return int
     */
    private function getIdInArray($array, $term)
    {
        foreach ($array as $key => $value) {
            if ($value == $term) {
                return $key+1;
            }
        }

        throw new UnexpectedValueException;
    }

    /**
     * Add roles to user to make them a concierge
     */
    public function makeRole($title)
    {
        $assigned_roles = array();

        $roles = array_fetch(Role::all()->toArray(), 'name');

        switch ($title) {
            case 'super_admin':
              	//$assigned_roles = array(1);
                $assigned_roles[] = $this->getIdInArray($roles, 'super_admin');
                break;
            case 'admin':
                //$assigned_roles = array(2);
                $assigned_roles[] = $this->getIdInArray($roles, 'admin');
            	break;
            default:
                throw new \Exception("The employee status entered does not exist");
        }

        $this->roles()->attach($assigned_roles);
    }
}
