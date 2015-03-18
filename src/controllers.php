<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Process\Process;


$app->get('/', function () use ($app) {
  $form1 = require __DIR__.'/forms/registration.php';
  $form2 = require __DIR__.'/forms/message.php';
  $message = $app['session']->getFlashBag()->get('message', array());
  return $app['twig']->render('index.html', array(
    'message' => $message,
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

    $app['session']->getFlashBag()->add('message', 'Estimado(a) '.$data['name'].
      ', confirmaremos tu inscripción en los próximos días #CEP2014.');
  } else {
    $app['session']->getFlashBag()->add('message',
      'Uno o más campos no fueron llenados correctamente. Inténtelo nuevamente');
  }
  return $app->redirect($app['url_generator']->generate('homepage').'#msg');
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

    $app['session']->getFlashBag()->add('message', 'Estimado(a) '.$data['name'].
      ', gracias por comunicarse con nosotros. Le respondremos en breve.');
  } else {
    $app['session']->getFlashBag()->add('message',
      'Uno o más campos no fueron llenados correctamente. Inténtelo nuevamente');
  }
  return $app->redirect($app['url_generator']->generate('homepage').'#msg');
})->bind('contact');

$app->get('/practice', function () use ($app) {
  $form = require __DIR__.'/forms/message.php';
  return $app['twig']->render('practice.html', array(
    'form2' => $form->createView()));
})->bind('practice');

$app->post('/practice', function(Request $request) use ($app) {
  $fields = $request->request->all();
  $ch = curl_init('http://176.31.129.223/compiler/');
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
  $result = curl_exec($ch);
  curl_close($ch);
  return new Response($result, 200, array('Content-type'=> 'application/json'));
});

$app->get('/results', function () use ($app) {
  $form = require __DIR__.'/forms/message.php';
  return $app['twig']->render('results.html',
    array('form2' => $form->createView()));
})->bind('results');

$app->get('/resources', function () use ($app) {
  $form = require __DIR__.'/forms/message.php';
  $dir = opendir(__DIR__.'/../web/files/');
  $files = array();
  while ($f = readdir($dir))
    if ($f[0] != '.')
      array_push($files, $f);
  return $app['twig']->render('resources.html',
    array('files' => $files, 'form2' => $form->createView()));
});

$app->error(function (\Exception $e, $code) use ($app) {
  if ($app['debug']) {
    return;
  }
  $page = 404 == $code ? '404.html' : '500.html';
  return new Response($app['twig']->render($page, array('code' => $code)), $code);
});

