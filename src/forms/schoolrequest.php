<?php

use Symfony\Component\Validator\Constraints as Assert;

$form = $app['form.factory']->createBuilder('form')
  ->add('requester_name', 'text', array(
    'attr' => array('size' => '60'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 50)))
  ))
  ->add('requester_type', 'choice', array(
    'choices' => array(0 => 'estudiante', 1 => 'profesor'),
    'constraints' => new Assert\Choice(array(0, 1)),
  ))
  ->add('school_name', 'text', array(
    'attr' => array('size' => '60', 'placeholder' => 'Nombre de Institución Educativa'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 20)))
  ))
  ->add('contact_name', 'text', array(
    'attr' => array('size' => '52', 'placeholder' => 'Nombre de la persona de contacto'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 50)))
  ))
  ->add('contact_info', 'textarea', array(
    'attr' => array('rows' => '2', 'style' => 'width:100%;',
      'placeholder' => 'Número telefónico o dirección de contacto'),
    'constraints' => array(new Assert\NotBlank(), new Assert\Length(array('max' => 300)))
  ))
  ->add('enviar', 'submit')
  ->getForm();

return $form;
