<?php
header('Content-Type: application/json');
$dataFile = __DIR__ . '/products.json';
function loadProducts($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return json_decode($content, true) ?? [];
}
function saveProducts($file, $products) {
    file_put_contents($file, json_encode($products, JSON_PRETTY_PRINT));
}
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}
function getProductId($uri) {
    $parts = explode('/', trim($uri, '/'));
    return isset($parts[1]) && is_numeric($parts[1]) ? (int)$parts[1] : null;
}
$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = strtok($requestUri, '?');
$products = loadProducts($dataFile);
if ($method === 'GET' && $requestUri === '/products') {
    sendResponse($products);
}
elseif ($method === 'GET' && preg_match('#^/products/(\d+)$#', $requestUri, $matches)) {
    $id = (int)$matches[1];
    foreach ($products as $product) {
        if ($product['id'] === $id) {
            sendResponse($product);
        }
    }
    sendResponse(['error' => 'Продукт не знайдено'], 404);
}
elseif ($method === 'POST' && $requestUri === '/products') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['name'])Uri === '/products') {
    {
        sendResponse(['error' => 'Заповніть ці поля: назва, ціна, кулькість'], 400);
    }
    $newId = empty($products) ? 1 : max(array_column($products, 'id')) + 1;
//я не впевнена чи їх можна писати укр тому пишу на англ
    $newProduct = [
        'id' => $newId,
        'name' => $input['name'],
        'price' => (float)$input['price'],
        'quantity' => (int)$input['quantity']
    ];
    $products[] = $newProduct;
    saveProducts($dataFile, $products);
    sendResponse($newProduct, 201);
}
elseif ($method === 'PUT' && preg_match('#^/products/(\d+)$#', $requestUri, $matches)) {
    $id = (int)$matches[1];
    $input = json_decode(file_get_contents('php://input'), true);
    $index = null;
    foreach ($products as $i => $p) {
        if ($p['id'] === $id) {
            $index = $i;
            break;
        }
    }
    if ($index === null) {
        sendResponse(['error' => 'Товар  не знайдено'], 404);
    }
    $product = $products[$index];
    if (isset($input['name'])) $product['name'] = $input['name'];
    if (isset($input['price'])) $product['price'] = (float)$input['price'];
    if (isset($input['quantity'])) $product['quantity'] = (int)$input['quantity'];
    $products[$index] = $product;
    saveProducts($dataFile, $products);
    sendResponse($product);
}
elseif ($method === 'DELETE' && preg_match('#^/products/(\d+)$#', $requestUri, $matches)) {
    $id = (int)$matches[1];
    $found = false;
    foreach ($products as $i => $p) {
        if ($p['id'] === $id) {
            array_splice($products, $i, 1);
            $found = true;
            break;
        }
    }
    if (!$found) {
        sendResponse(['error' => 'Товар не знайдено'], 404);
    }
    saveProducts($dataFile, $products);
    sendResponse(['message' => 'Товар успішно видаленок']);
}
else {
    sendResponse(['error' => 'Не знайдено або заборонений метод'], 404);
}
?>