<?php

use Symfony\Component\Validator\Constraints as Assert;

$form = $app['form.factory']->createBuilder('form')
  ->add('name', 'text', array(
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 50)))
  ))
  ->add('dni', 'text', array(
    'constraints' => array(new Assert\Length(array('min' => 8, 'max' => 8)))
  ))
  ->add('school_name', 'text', array(
    'constraints' => array(new Assert\Length(array('max' => 50)))
  ))
  ->add('email', 'email', array(
    'constraints' => array(new Assert\Length(array('max' => 50)))
  ))
  ->add('enviar', 'submit')
  ->getForm();

return $form;
