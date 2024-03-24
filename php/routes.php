<?php

// Fonction pour ajouter les en-têtes CORS
function addCorsHeaders() {
    // Autoriser l'accès depuis n'importe quelle origine
    header("Access-Control-Allow-Origin: *");
    // Autoriser les méthodes HTTP spécifiées
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
    // Autoriser les en-têtes spécifiés
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Appel de la fonction pour ajouter les en-têtes CORS
addCorsHeaders();

// Show error message
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/router.php';

$DBuser = 'root';
$DBpass = '';
$DBhost = 'localhost';
$DBname = 'equipe405';
$DBsocket = '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock';

$pdo = new PDO("mysql:host=$DBhost;dbname=$DBname;charset=utf8mb4;unix_socket=$DBsocket", $DBuser, $DBpass);

//Cleaning when using POST API
function cleaning($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**********************************************************
                     COMMON APIS 
 **********************************************************/

// Show every clients
get('/api/clients', function () use ($pdo) {
    $client = $pdo->prepare('SELECT * FROM Client');
    $client->execute();
    $allClients = $client->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allClients);
});

// Show articles in each orders
get('/api/orders/$session', function ($session) use ($pdo) {
    if (isset($session)) {
        $article = $pdo->prepare(
            'SELECT * FROM Article 
            INNER JOIN ArticleCart 
            ON ArticleCart.id_article = Article.id_article 
            INNER JOIN Orders 
            ON ArticleCart.id_session = Orders.id_session
            WHERE Orders.id_session = :session'
        );
        $article->bindValue(':session', $session, PDO::PARAM_STR);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

// Select the size name and the number of size for an article
get('/api/size/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT size_name, number_of_size 
            FROM Article
            INNER JOIN Size ON Article.id_article = Size.id_article
            WHERE Size.id_article = :id_article'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

// Select the hexadecimal color code for an article
get('/api/color/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT color_code 
            FROM Color
            WHERE id_article = :id_article'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

// Select all of the urls (pictures) for an article
get('/api/picture/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT url 
            FROM Picture
            INNER JOIN Article ON Picture.id_article = Article.id_article
            WHERE Picture.id_article = :id_article'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

// Select the first url (picture) for an article
get('/api/firstPicture/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT * 
            FROM Picture
            WHERE id_article = :id_article
            ORDER BY id_picture
            LIMIT  1'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

// Select payment option of a client
get('/api/client/$id_client', function ($id_client) use ($pdo) {
    if (isset($id_client)) {
        $client = $pdo->prepare(
            'SELECT payment_option 
            FROM Orders
            INNER JOIN Client ON Orders.id_client = Client.id_client
            WHERE Client.id_client = :id_client'
        );
        $client->bindValue(':id_client', $id_client, PDO::PARAM_INT);
        $client->execute();
        $allClients = $client->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allClients);
    }
});

// Select orders according to their status
get('/api/ordersStatus/$status', function ($status) use ($pdo) {
    if (isset($status)) {
        $order = $pdo->prepare(
            'SELECT id_orders 
            FROM Orders
            WHERE Orders.status = :status'
        );
        $order->bindValue(':status', $status, PDO::PARAM_STR);
        $order->execute();
        $allOrders = $order->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allOrders);
    }
});

// Select id_article lowest to highest price for feed page
get('/api/article/lowestPrice', function () use ($pdo) {
    $article = $pdo->prepare(
        'SELECT * 
        FROM Article
        ORDER BY price ASC'
    );
    $article->execute();
    $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allArticles);
});

// Select id_article highest to lowest price for feed page
get('/api/article/highestPrice', function () use ($pdo) {
    $article = $pdo->prepare(
        'SELECT * 
        FROM Article
        ORDER BY price DESC'
    );
    $article->execute();
    $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allArticles);
});

// Select article id in descending order of date for feed page
get('/api/article/newestArticle', function () use ($pdo) {
    $article = $pdo->prepare(
        'SELECT * 
        FROM Article
        ORDER BY upload_date DESC'
    );
    $article->execute();
    $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allArticles);
});

// Select article id in ascending order of date for feed page
get('/api/article/oldestArticle', function () use ($pdo) {
    $article = $pdo->prepare(
        'SELECT * 
        FROM Article
        ORDER BY upload_date ASC'
    );
    $article->execute();
    $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allArticles);
});

// Select orders sorted by date in descending order (newest first) for Orders page
get('/api/allOrders/newest', function () use ($pdo) {
    $orders = $pdo->prepare(
        'SELECT * FROM Orders ORDER BY date DESC'
    );
    $orders->execute();
    $allOrders = $orders->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allOrders);
});

// Select orders sorted by date in ascending order (oldest first) for Orders page
get('/api/allOrders/oldest', function () use ($pdo) {
    $article = $pdo->prepare(
        'SELECT * FROM Orders ORDER BY date ASC'
    );
    $article->execute();
    $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');

    http_response_code(200);
    echo json_encode($allArticles);
});

//sélectioner un article
get('/api/article/$id_article', function($id_article) use ($pdo){
    if(isset($id_article)){
        $article = $pdo->prepare(
            'SELECT * 
            FROM Article
            WHERE Article.id_article = :id_article'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});

//sélectioner toutes les couleurs uniques
get('/api/uniqueColors', function() use ($pdo){

        $uniqueColors = $pdo->prepare(
            'SELECT DISTINCT color_code 
            FROM color
'
        );
        $uniqueColors->execute();
        $allUniqueColors = $uniqueColors->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allUniqueColors);
});

//sélectioner toutes les types uniques
get('/api/uniqueTypes', function() use ($pdo){

        $uniqueTypes = $pdo->prepare(
            'SELECT DISTINCT type 
            FROM article
'
        );
        $uniqueTypes->execute();
        $allUniqueTypes = $uniqueTypes->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allUniqueTypes);
});

/**********************************************************
                USED APIS FOR THE APP
 **********************************************************/

// Api for the login
post('/api/login', function () use ($pdo) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['email'], $data['password'])) {
        $email = $data['email'];
        $password = $data['password'];

        $query = $pdo->prepare('SELECT * FROM Employee WHERE email = ?');
        $query->execute([$email]);

        $user = $query->fetch(PDO::FETCH_ASSOC);
        if ($user && isset($user['password'])) {
            // Verify the password
            if (password_verify($password, $user['password'])) {
                // Password is correct, login successful
                http_response_code(200);
                echo json_encode(array('message' => 'Login successful'));
            } else {
                // Password is incorrect, return error
                http_response_code(401);
                echo json_encode(array('message' => 'Invalid email or password'));
            }
        } else {
            // User not found, return error
            http_response_code(401);
            echo json_encode(array('message' => 'Invalid email or password'));
        }
    } else {
        // Missing email or password, return error
        http_response_code(400);
        echo json_encode(array('message' => 'Missing email or password'));
    }
});

// Api for the signin
post('/api/signin', function () use ($pdo) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['username'], $data['email'], $data['password'])) {
        $email = $data['email'];
        $password = $data['password'];
        $username = $data['username'];

        // Check if the email is already used
        $query = $pdo->prepare('SELECT COUNT(*) AS count FROM Employee WHERE email = ?');
        $query->execute([$email]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        $email_count = $result['count'];

        if ($email_count > 0) {
            // Email already exists, return an error
            http_response_code(400);
            echo json_encode(array('message' => 'Email already exists'));
            return;
        }

        // Check if the username is already used
        $query = $pdo->prepare('SELECT COUNT(*) AS count FROM Employee WHERE username = ?');
        $query->execute([$username]);
        $result = $query->fetch(PDO::FETCH_ASSOC);
        $username_count = $result['count'];

        if ($username_count > 0) {
            // Username already exists, return an error
            http_response_code(400);
            echo json_encode(array('message' => 'Username already exists'));
            return;
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert the new user into the database
        $query = $pdo->prepare('INSERT INTO Employee (username, email, password) VALUES (?, ?, ?)');
        $query->execute([$username, $email, $hashed_password]);

        // Respond with a success message
        http_response_code(201);
        echo json_encode(array('message' => 'User created successfully'));
    } else {
        // Some data is missing, return an error
        http_response_code(400);
        echo json_encode(array('message' => 'Missing username, email, or password'));
    }
});

// Show every articles with size, color, and picture details
get('/api/articles', function () use ($pdo) {
    $articles = $pdo->prepare('SELECT * FROM Article');
    $articles->execute();
    $allArticles = $articles->fetchAll(PDO::FETCH_ASSOC);

    foreach ($allArticles as &$article) {
        // Fetch size details
        $sizeStmt = $pdo->prepare('SELECT size_name, number_of_size FROM Size WHERE id_article = :id_article');
        $sizeStmt->bindValue(':id_article', $article['id_article'], PDO::PARAM_INT);
        $sizeStmt->execute();
        $article['sizes'] = $sizeStmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch color details
        $colorStmt = $pdo->prepare('SELECT color_code FROM Color WHERE id_article = :id_article');
        $colorStmt->bindValue(':id_article', $article['id_article'], PDO::PARAM_INT);
        $colorStmt->execute();
        $article['colors'] = $colorStmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch picture details
        $pictureStmt = $pdo->prepare('SELECT url FROM Picture WHERE id_article = :id_article');
        $pictureStmt->bindValue(':id_article', $article['id_article'], PDO::PARAM_INT);
        $pictureStmt->execute();
        $article['pictures'] = $pictureStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($allArticles);
});
