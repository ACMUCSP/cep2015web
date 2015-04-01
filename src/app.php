<?php

use Silex\Application;
use Silex\Provider\SessionServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\ValidatorServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\DoctrineServiceProvider;
use Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider;
use Silex\Provider\FormServiceProvider;
use Silex\Provider\TranslationServiceProvider;

$app = new Application();
$app->register(new SessionServiceProvider());
$app->register(new UrlGeneratorServiceProvider());
$app->register(new ValidatorServiceProvider());
$app->register(new ServiceControllerServiceProvider());
$app->register(new TwigServiceProvider(), array(
    'twig.path'    => array(__DIR__.'/../templates'),
    'twig.options' => array('cache' => __DIR__.'/../cache/twig'),
));
$app->register(new DerAlex\Silex\YamlConfigServiceProvider(__DIR__ . '/../config/settings.yml'));

$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    // add custom globals, filters, tags, ...
    return $twig;
}));

$app->register(new DoctrineServiceProvider(), array(
  'db.options' => $app['config']['database']
));
$app->register(new DoctrineOrmServiceProvider, array(
  "orm.em.options" => array(
    "mappings" => array(
      array(
        "type" => "yml",
        "namespace" => "Cep\Entity",
        "path" => realpath(__DIR__."/../config/doctrine"),
      ),
    ),
  ),
));

$app->register(new FormServiceProvider());
$app->register(new TranslationServiceProvider(), array(
  'translator.messages' => array(),
));

return $app;
