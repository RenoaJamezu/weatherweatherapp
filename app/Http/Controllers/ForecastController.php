<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Exception;

class WeatherController extends Controller
{

  private $apiKey;

  public function getWeather (string $location){

    $this->apiKey = env('WEATHER_API_KEY');

    $url = "https://api.openweathermap.org/data/2.5/weather?q={$location}&appid={$this->apiKey}";

    try {
      $weather = Http::get($url);

      $weatherResults = $weather->json();

      return response()->json([
        'location' => $location,
        'weather' => $weatherResults,
      ]);
    } catch (Exception $e) {
      return response()->json([
        'message' => 'Error getting weather data for' . $location,
        'error' => $e->getMessage(),
      ],
      404
      );
    }
  }
}
