INSERT INTO `esolved`.`roles` (`id`, `name`) VALUES ('1', 'administrador');
INSERT INTO `esolved`.`roles` (`id`, `name`) VALUES ('2', 'alumno');


INSERT INTO `esolved`.`users_roles` (`id`, `user_id`, `role_id`) VALUES ('1', '1', '1');


ALTER TABLE materias ADD days tinyint(1) AFTER obligatorio
