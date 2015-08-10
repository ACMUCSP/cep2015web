<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/', function () use ($app) {
    $form1 = require __DIR__.'/forms/registration.php';
    $form2 = require __DIR__.'/forms/message.php';
    return $app['twig']->render('index.twig', array(
        'form1' => $form1->createView(),
        'form2' => $form2->createView()));
})->bind('homepage');


$app->post('/registration', function (Request $request) use ($app) {
    $form = require __DIR__.'/forms/registration.php';
    $form->handleRequest($request);
    if ($form->isValid()) {
        $data = $form->getData();
        $msg = new Cep\Entity\Registration();
        $msg->setCreatedTime(new DateTime())
            ->setName($data['name'])
            ->setDni($data['dni'])
            ->setSchoolName($data['school_name'])
            ->setEmail($data['email']);

        $entity_manager = $app["orm.em"];
        $entity_manager->persist($msg);
        $entity_manager->flush();

        return new Response('Gracias. Te invitamos a practicar en nuestra sección «Aprende»', 200);
    } else {
        return new Response('Uno o más campos no fueron llenados correctamente', 400);
    }
})->bind('registration');


$app->post('/contact', function (Request $request) use ($app) {
    $form = require __DIR__.'/forms/message.php';
    $form->handleRequest($request);
    if ($form->isValid()) {
        $data = $form->getData();
        $msg = new Cep\Entity\Message();
        $msg->setCreatedTime(new DateTime())
            ->setName($data['name'])
            ->setEmail($data['email'])
            ->setMessage($data['message']);

        $entity_manager = $app["orm.em"];
        $entity_manager->persist($msg);
        $entity_manager->flush();

        return new Response('Mensaje recibido correctamente', 200);
    } else {
        return new Response('Uno o más campos no fueron llenados correctamente', 400);
    }
})->bind('contact');

$app->get('/practice', function () use ($app) {
    $form = require __DIR__.'/forms/message.php';
    return $app['twig']->render('practice.twig', array(
        'form2' => $form->createView()));
})->bind('practice');

$app->post('/practice', function(Request $request) use ($app) {
    $fields = $request->request->all();
    $ch = curl_init('http://5.196.175.155/compiler/');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return new Response($result, 200, array('Content-type'=> 'application/json'));
});

/*
$app->get('/results', function () use ($app) {
    $form = require __DIR__.'/forms/message.php';
    return $app['twig']->render('results.twig',
        array('form2' => $form->createView()));
})->bind('results');
*/

$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }
    $page = 404 == $code ? '404.twig' : '500.twig';
    return new Response($app['twig']->render($page, array('code' => $code)), $code);
});

