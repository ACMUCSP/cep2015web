<?php

use Symfony\Component\Validator\Constraints as Assert;

$form = $app['form.factory']->createBuilder('form')
    ->add('name', 'text', array(
        'attr' => array('placeholder' => 'Nombres y Apellidos'),
        'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 50)))
    ))
    ->add('dni', 'text', array(
        'attr' => array('placeholder' => 'DNI'),
        'constraints' => array(new Assert\Length(array('min' => 8, 'max' => 8)))
    ))
    ->add('school_name', 'text', array(
        'attr' => array('placeholder' => 'Nombre del Colegio'),
        'constraints' => array(new Assert\Length(array('max' => 50)))
    ))
    ->add('email', 'email', array(
        'attr' => array('placeholder' => 'Email'),
        'constraints' => array(new Assert\Length(array('max' => 50)))
    ))
    ->getForm();

return $form;
