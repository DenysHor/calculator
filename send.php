<?php
// Конфігурація
$secretKey = "6LcosxwrAAAAANMgiY-hy_IkfOwpI97E9E_HCdxZ"; // Твій секретний ключ reCAPTCHA
$adminEmail = "info@warmcompany.eu"; // Твоя адреса для отримання копії
$fromEmail = "info@warmcompany.eu";

// Приймаємо JSON-запит
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['email']) || empty($data['body']) || empty($data['token'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Недостатньо даних"]);
    exit;
}

// Перевірка reCAPTCHA
$token = $data['token'];
$recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
$response = file_get_contents($recaptchaUrl . "?secret=$secretKey&response=$token");
$responseKeys = json_decode($response, true);

if (!$responseKeys["success"] || $responseKeys["score"] < 0.5) {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Підтвердження reCAPTCHA не пройдено"]);
    exit;
}

// Надсилання email
$subject = "Підсумок розрахунку тепловтрат";
$headers = "From: $fromEmail\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

$message = $data['body'];
$userEmail = $data['email'];

mail($adminEmail, $subject, $message, $headers);
mail($userEmail, $subject, $message, $headers);

echo json_encode(["status" => "success", "message" => "Розрахунок надіслано"]);
?>
