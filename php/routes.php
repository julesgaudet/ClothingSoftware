<?php

// Fonction pour ajouter les en-têtes CORS
function addCorsHeaders()
{
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



get('/api/totalPrice/$session', function ($session) use ($pdo) {
    if (isset($session)) {
        $article = $pdo->prepare(
            'SELECT sum(price) as total FROM Article 
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

//post le id_article, id_color, id_size à base de donnée (tableau articleCart)
post('/api/addtocart', function () use ($pdo) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupérer les données JSON envoyées dans le corps de la requête
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // Récupérer les valeurs des champs
        $id_article = $data['id_article'];
        $id_color = $data['id_color'];
        $id_size = $data['id_size'];
        $id_session = $data['id_session'];

        // Vous pouvez effectuer des opérations supplémentaires ici, comme l'insertion des données dans la base de données
        try {
            $requete = $pdo->prepare('INSERT INTO ArticleCart(id_article,id_session, id_color, id_size) VALUES (?,?, ?, ?)');
            $requete->execute([$id_article, $id_session, $id_color, $id_size]);

            // Exemple de réponse JSON
            $response = ['message' => 'Item added to cart successfully'];
            echo json_encode($response);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => $e]);
        }
    } else {
        // Si la requête n'est pas de type POST, retourner une erreur de méthode non autorisée
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
    }
});



//post pour le id session seulement 
post('/api/CartSession', function () use ($pdo) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupérer les données JSON envoyées dans le corps de la requête
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // Récupérer les valeurs des champs
        $id_session = $data['id_session'];

        // Vous pouvez effectuer des opérations supplémentaires ici, comme l'insertion des données dans la base de données
        try {
            $requete = $pdo->prepare('INSERT INTO Cart(id_session) VALUES (?)');
            $requete->execute([$id_session]);

            // Exemple de réponse JSON
            $response = ['message' => 'Item added to cart successfully'];
            echo json_encode($response);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => $e]);
        }
    } else {
        // Si la requête n'est pas de type POST, retourner une erreur de méthode non autorisée
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
    }
});

// Select the size name and the number of size for an article
get('/api/size/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT *
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
            'SELECT color_code , id_color
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
get('/api/article/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
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
get('/api/uniqueColors', function () use ($pdo) {

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
get('/api/uniqueTypes', function () use ($pdo) {

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

//api pour obtenir les articles selon les filtres
get('/api/articles', function () use ($pdo) {
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $colors = isset($_GET['colors']) ? $_GET['colors'] : [];
    $brand = isset($_GET['brand']) ? $_GET['brand'] : null;
    $sizes = isset($_GET['sizes']) ? $_GET['sizes'] : [];
    $order = isset($_GET['order']) ? $_GET['order'] : 'latest'; // Par défaut, tri par date de mise à jour

    $query = 'SELECT DISTINCT article.*
              FROM article
              JOIN color ON Article.id_article = Color.id_article
              JOIN size ON Article.id_article = Size.id_article';

    if ($type) {
        $query .= " AND Article.type = :type";
    }

    if ($brand) {
        $query .= " AND Article.brand = :brand";
    }

    if (!empty($colors)) {
        // Ajouter "#" devant chaque couleur
        $colorsWithHash = array_map(function ($color) {
            return '#' . $color;
        }, $colors);

        // Construire la requête SQL avec les couleurs modifiées
        $query .= " AND Color.color_code IN ('" . implode("','", $colorsWithHash) . "')";
    }


    if (!empty($sizes)) {
        $query .= " AND (";
        foreach ($sizes as $size) {
            $query .= " (Size.size_name = :size AND Size.number_of_size > 0) OR";
        }
        $query = rtrim($query, 'OR');
        $query .= ")";
    }

    switch ($order) {
        case '1':
            $query .= ' ORDER BY Article.upload_date DESC';
            break;
        case '2':
            $query .= ' ORDER BY Article.price DESC';
            break;
        case '3':
            $query .= ' ORDER BY Article.price ASC';
            break;
        default:
            $query .= ' ORDER BY Article.upload_date DESC';
    }

    $statement = $pdo->prepare($query);

    if ($type) {
        $statement->bindValue(':type', $type, PDO::PARAM_STR);
    }

    if ($brand) {
        $statement->bindValue(':brand', $brand, PDO::PARAM_STR);
    }

    if (!empty($sizes)) {
        foreach ($sizes as $size) {
            $statement->bindValue(':size', $size, PDO::PARAM_STR);
        }
    }

    $statement->execute();
    $articles = $statement->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    http_response_code(200);
    echo json_encode($articles);
});

//sélectioner un panier + la couleur de chaque articles + la photo d'un article selon+ la taille de chaque articles selon un Cartid

get('/api/cart/$id_session', function ($id_session) use ($pdo) {
    if (isset($id_session)) {
        $article = $pdo->prepare(
            'SELECT * 
            FROM articlecart A INNER JOIN color C ON A.id_color = C.id_color
            INNER JOIN size S ON A.id_size = S.id_size
            INNER JOIN article AR ON A.id_article = AR.id_article
            WHERE id_session = :id_session
            '
        );
        $article->bindValue(':id_session', $id_session, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});


// Select the hexadecimal color code for an color id
get('/api/color/id/$id', function ($id) use ($pdo) {
    if (isset($id)) {
        $article = $pdo->prepare(
            'SELECT color_code 
            FROM Color
            WHERE id_color = :id'
        );
        $article->bindValue(':id', $id, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});


//ajouter un nouveau client

post('/api/AddClient', function () use ($pdo) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupérer les données JSON envoyées dans le corps de la requête
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // Récupérer les valeurs des champs
        $first_name = cleaning($data['name']);
        $last_name = cleaning($data['name']);
        $email = cleaning($data['email']);
        $address = cleaning($data['address']);
        $country = cleaning($data['country']);
        $city = cleaning($data['city']);
        $region_state = cleaning($data['region']);
        $zip_code = cleaning($data['zip']);

        // Vous pouvez effectuer des opérations supplémentaires ici, comme l'insertion des données dans la base de données
        try {
            $requete = $pdo->prepare('INSERT INTO Client(first_name, last_name, email, address, country, city, region_state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
            $requete->execute([$first_name, $last_name, $email, $address, $country, $city, $region_state, $zip_code]);

            // Récupérer l'ID du dernier client ajouté
            $lastClientId = $pdo->lastInsertId();

            // Exemple de réponse JSON
            $response = ['message' => 'Client added successfully', 'lastClientId' => $lastClientId];
            echo json_encode($response);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'An error occurred while processing your request']);
        }
    } else {
        // Si la requête n'est pas de type POST, retourner une erreur de méthode non autorisée
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
    }
});

// Ajouter un nouvel order et diminuer le stock des size de cet order
post('/api/AddOrder', function () use ($pdo) {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);


        $date = date('Y-m-d H:i:s'); // la date actuelle
        $status = cleaning($data['status']);
        $payment_option = cleaning($data['payment_option']);
        $id_session = cleaning($data['id_session']);
        $id_client = cleaning($data['id_client']);

        try {
            $requete = $pdo->prepare('INSERT INTO orders(date, status, payment_option, id_session, id_client) VALUES (?, ?, ?, ?, ?)');
            $requete->execute([$date, $status, $payment_option, $id_session, $id_client]);


            // Récupérer l'ID du dernier client ajouté
            $lastId = $pdo->lastInsertId();

            // Exemple de réponse JSON
            $response = ['message' => 'Order added successfully', 'lastOrderId' => $lastId];
            echo json_encode($response);

            // Récupérer les ID de taille associés à l'ID de session
            $stmt = $pdo->prepare('SELECT id_size FROM articlecart WHERE id_session = ?');
            $stmt->execute([$id_session]);
            $id_sizes = $stmt->fetchAll(PDO::FETCH_COLUMN);

            // Si des ID de taille sont trouvés, diminuer le stock
            if ($id_sizes) {
                $id_sizes_str = implode(',', $id_sizes); // Convertir en chaîne séparée par des virgules
                $sql_update = "UPDATE `size` SET `number_of_size` = `number_of_size` - 1 WHERE `id_size` IN ($id_sizes_str)";
                $pdo->exec($sql_update);
            }
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => 'An error occurred while processing your request', 'msg' => [$date, $status, $payment_option, $id_session, $id_client]]);
        }
    } else {
        // Si la requête n'est pas de type POST, retourner une erreur de méthode non autorisée
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
    }
});

delete('/api/deleteArticle/$id_A/$id_C/$id_S', function ($id_A, $id_C, $id_S) use ($pdo) {
    try {
        // Préparez la requête SQL DELETE pour supprimer l'article du panier avec les IDs spécifiés
        $requete = $pdo->prepare('DELETE FROM ArticleCart WHERE id_article = ? AND id_color = ? AND id_size = ?');
        // Exécutez la requête en passant les IDs de l'article, de la couleur et de la taille à supprimer
        $requete->execute([$id_A, $id_C, $id_S]);

        // Réponse JSON indiquant que l'article a été supprimé avec succès
        $response = ['message' => 'Article deleted successfully'];
        echo json_encode($response);
    } catch (Exception $e) {
        // En cas d'erreur, renvoyez une réponse d'erreur avec le code 500 (Internal Server Error)
        http_response_code(500);
        echo json_encode(['error' => $e]);
    }
});


/**********************************************************
                USED APIS FOR THE APP
 ***********************************************************/

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

                http_response_code(200);
                echo json_encode(array('message' => 'Login successful'));
            } else {
                http_response_code(401);
                echo json_encode(array('message' => 'Invalid email or password'));
            }
        } else {
            http_response_code(401);
            echo json_encode(array('message' => 'Invalid email or password'));
        }
    } else {
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

        // Get the ID of the newly inserted user
        $id_employee = $pdo->lastInsertId();

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
get('/api/app/articles', function () use ($pdo) {
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

// Api when you post an article
post('/api/postArticle', function () use ($pdo) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (isset($data['name'], $data['description'], $data['price'], $data['type'], $data['brand'], $data['sizes'], $data['colors'], $data['pictures'])) {
            $name = $data['name'];
            $description = $data['description'];
            $price = $data['price'];
            $type = $data['type'];
            $brand = $data['brand'];
            $employeeId = 1;
            $sizes = $data['sizes'];
            $colors = $data['colors'];
            $pictures = $data['pictures'];

            date_default_timezone_set('America/Montreal');
            $uploadDate = date('Y-m-d H:i:s');

            // Prepare the SQL query to insert a new article
            $stmt = $pdo->prepare('INSERT INTO Article (name, description, price, type, brand, upload_date, id_employee) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $stmt->execute([$name, $description, $price, $type, $brand, $uploadDate, $employeeId]);
            $articleId = $pdo->lastInsertId(); // Get the inserted article ID

            // Insert the sizes of the article
            foreach ($sizes as $size) {
                if (isset($size['size_name'], $size['number_of_size'])) {
                    $sizeName = $size['size_name'];
                    $numberOfSize = $size['number_of_size'];
                    $stmt = $pdo->prepare('INSERT INTO Size (size_name, number_of_size, id_article) VALUES (?, ?, ?)');
                    $stmt->execute([$sizeName, $numberOfSize, $articleId]);
                }
            }

            // Insert the colors of the article
            foreach ($colors as $color) {
                if (isset($color['color_code'])) {
                    $colorCode = $color['color_code'];
                    $stmt = $pdo->prepare('INSERT INTO Color (color_code, id_article) VALUES (?, ?)');
                    $stmt->execute([$colorCode, $articleId]);
                }
            }

            // Insert the pictures of the article
            foreach ($pictures as $picture) {
                if (isset($picture['url'])) {
                    $url = $picture['url'];
                    $stmt = $pdo->prepare('INSERT INTO Picture (url, id_article) VALUES (?, ?)');
                    $stmt->execute([$url, $articleId]);
                }
            }
            http_response_code(201);
            echo json_encode(array('message' => 'Article created successfully'));
        } else {
            http_response_code(400);
            echo json_encode(array('message' => 'Missing required data'));
        }
    } else {
        http_response_code(405);
        echo json_encode(array('message' => 'Method Not Allowed'));
    }
});

// Endpoint to fetch the first picture of an article by its ID
get('/api/firstPicture/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        // Prepare the SQL query to select the URL of the first picture
        $article = $pdo->prepare(
            'SELECT url
            FROM Picture
            WHERE id_article = :id_article
            ORDER BY id_picture
            LIMIT  1'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        // Fetch the first picture URL
        $firstPicture = $article->fetch(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        // Return only the URL of the picture
        echo json_encode($firstPicture['url']);
    }
});

// Endpoint to fetch all orders along with client details
get('/api/app/orders', function () use ($pdo) {
    // Select all orders from the database
    $ordersQuery = 'SELECT * FROM Orders';
    $ordersStatement = $pdo->query($ordersQuery);
    $allOrders = $ordersStatement->fetchAll(PDO::FETCH_ASSOC);

    // Iterate through each order
    foreach ($allOrders as &$order) {
        $sessionId = $order['id_session'];

        // SQL query to fetch articles in the order
        $articleCartQuery = 'SELECT Article.id_article, Article.name, Article.price, Color.color_code AS color, Size.size_name AS size
        FROM ArticleCart 
        INNER JOIN Article ON ArticleCart.id_article = Article.id_article 
        INNER JOIN Color ON ArticleCart.id_color = Color.id_color
        INNER JOIN Size ON ArticleCart.id_size = Size.id_size
        WHERE ArticleCart.id_session = :session';

        $articleCartStatement = $pdo->prepare($articleCartQuery);
        $articleCartStatement->bindParam(':session', $sessionId, PDO::PARAM_STR);
        $articleCartStatement->execute();
        $order['article_cart'] = $articleCartStatement->fetchAll(PDO::FETCH_ASSOC);

        // Loop through each article in the order to fetch its first picture
        foreach ($order['article_cart'] as &$article) {
            $articleId = $article['id_article'];
            // SQL query to fetch the first picture of the article
            $firstPictureQuery = "SELECT url FROM Picture WHERE id_article = :articleId LIMIT 1";
            $firstPictureStatement = $pdo->prepare($firstPictureQuery);
            $firstPictureStatement->bindParam(':articleId', $articleId, PDO::PARAM_INT);
            $firstPictureStatement->execute();
            $firstPicture = $firstPictureStatement->fetch(PDO::FETCH_ASSOC);
            // Add the first picture URL to the article information
            $article['first_picture'] = $firstPicture['url'];
        }

        // Fetch client details for the order
        $clientId = $order['id_client'];
        $clientQuery = 'SELECT first_name, last_name, 
                        email, address, country, city, region_state, zip_code
                        FROM Client WHERE id_client = :clientId';
        $clientStatement = $pdo->prepare($clientQuery);
        $clientStatement->bindParam(':clientId', $clientId, PDO::PARAM_INT);
        $clientStatement->execute();
        $order['client'] = $clientStatement->fetch(PDO::FETCH_ASSOC);
    }

    header('Content-Type: application/json');
    http_response_code(200);
    // Return the JSON representation of all orders with client details and first picture URLs
    echo json_encode($allOrders);
});

// Delete an Article
delete('/api/app/$title', function ($title) use ($pdo) {
    if (isset($title)) {

        $title = urldecode($title);
        // Prepare the SQL query to select the ID of the article
        $article = $pdo->prepare("SELECT id_article FROM Article WHERE name = :title");
        $article->bindValue(':title', $title, PDO::PARAM_STR);
        $article->execute();

        // Fetch the article ID
        $article_id = $article->fetch(PDO::FETCH_ASSOC)['id_article'];

        // Begin a transaction
        $pdo->beginTransaction();

        // Delete entries in the Color table related to the article
        $delete_color = $pdo->prepare("DELETE FROM Color WHERE id_article = :article_id");
        $delete_color->bindValue(':article_id', $article_id, PDO::PARAM_INT);
        $delete_color->execute();

        // Delete entries in the Size table related to the article
        $delete_size = $pdo->prepare("DELETE FROM Size WHERE id_article = :article_id");
        $delete_size->bindValue(':article_id', $article_id, PDO::PARAM_INT);
        $delete_size->execute();

        // Delete entries in the Picture table related to the article
        $delete_picture = $pdo->prepare("DELETE FROM Picture WHERE id_article = :article_id");
        $delete_picture->bindValue(':article_id', $article_id, PDO::PARAM_INT);
        $delete_picture->execute();

        // Delete the article itself
        $delete_article = $pdo->prepare("DELETE FROM Article WHERE id_article = :article_id");
        $delete_article->bindValue(':article_id', $article_id, PDO::PARAM_INT);
        $delete_article->execute();

        // Commit the transaction
        $pdo->commit();

        // Check if any rows were affected by the deletion
        $rowsAffected = $delete_article->rowCount();
        if ($rowsAffected > 0) {
            // Set response headers and status code
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(array("message" => "Article deleted successfully"));
        } else {
            // Set response headers and status code for failure
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode(array("message" => "Failed to delete article"));
        }
    }
});

get('/api/app/more/$title', function ($title) use ($pdo) {
    if (!empty($title)) {
        $title = urldecode($title);

        try {
            // Prepare the SQL query to select the ID of the article
            $article = $pdo->prepare("SELECT id_article FROM Article WHERE name = :title");
            $article->bindParam(':title', $title, PDO::PARAM_STR);
            $article->execute();

            // Fetch the article ID
            $articleData = $article->fetch(PDO::FETCH_ASSOC);

            if ($articleData !== false && isset($articleData['id_article'])) {
                $article_id = $articleData['id_article'];

                // Check if the article ID is not associated with any id_article in ArticleCart
                $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM ArticleCart WHERE id_article = :article_id");
                $stmt->bindParam(':article_id', $article_id, PDO::PARAM_INT);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);

                // If the count is 0, the article is not associated with any id_article in ArticleCart
                if ($result['count'] == 0) {
                    // Set response headers and status code for success
                    header('Content-Type: application/json');
                    http_response_code(200);
                    echo json_encode(array("message" => "Article is not associated with any id_article in ArticleCart"));
                } else {
                    // Set response headers and status code for failure
                    header('Content-Type: application/json');
                    http_response_code(400);
                    echo json_encode(array("message" => "Failed to delete article: Article is associated with id_article in ArticleCart"));
                }
            } else {
                // Article not found
                header('Content-Type: application/json');
                http_response_code(404);
                echo json_encode(array("message" => "Article not found"));
            }
        } catch (PDOException $e) {
            // Handle PDOException
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        // Invalid or empty title
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode(array("message" => "Invalid or empty title"));
    }
});

// API to mark an order as shipped
put('/api/app/markedCompleted/$orderID', function ($orderID) use ($pdo) {
    // Retrieve data sent in the request
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Check if the 'id_orders' field is present in the data
    if (isset($orderID)) {
        // Prepare the SQL query to update the order status
        $updateOrderStatus = $pdo->prepare("UPDATE Orders SET status = 'Shipped' WHERE id_orders = :orderId");

        // Bind the value of the order ID
        $updateOrderStatus->bindParam(':orderId', $orderID, PDO::PARAM_INT);

        // Execute the query
        if ($updateOrderStatus->execute()) {
            // If the update succeeds, send a success response
            http_response_code(200);
            echo json_encode(array("message" => "Order status updated successfully"));
        } else {
            // If the update fails, send an error response
            http_response_code(500);
            echo json_encode(array("message" => "Failed to update order status"));
        }
    } else {
        // If the order ID is missing in the URL, send an error response
        http_response_code(400);
        echo json_encode(array("message" => "Missing order ID in URL"));
    }
});
