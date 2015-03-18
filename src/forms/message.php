<?php

use Symfony\Component\Validator\Constraints as Assert;

$form = $app['form.factory']->createBuilder('form')
  ->add('name', 'text', array(
    'attr' => array('placeholder' => 'Nombre'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 50)))
  ))
  ->add('email', 'email', array(
    'attr' => array('placeholder' => 'Email'),
  ))
  ->add('message', 'textarea', array(
    'attr' => array('rows' => '3', 'placeholder' => 'Mensaje'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 300)))
  ))
  ->add('enviar', 'submit')
  ->getForm();

return $form;
