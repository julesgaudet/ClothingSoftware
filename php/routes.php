/Applications/XAMPP/xamppfiles/htdocs/routes.php

<?php
//sélectioner un article
get('/api/article/$id_arcticle', function($id_article) use ($pdo){
    if(isset($id_arcticle)){
        $article = $pdo->prepare(
            'SELECT* 
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
// selectioner les urls des photo de un article
get('/api/picture/$id_arcticle', function($id_article) use ($pdo){
    if(isset($id_arcticle)){
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

// Select the hexadecimal color code for an article
get('/api/color/$id_article', function ($id_article) use ($pdo) {
    if (isset($id_article)) {
        $article = $pdo->prepare(
            'SELECT color_code 
            FROM Color
            INNER JOIN Article ON Color.id_article = Article.id_article
            WHERE Color.id_article = :id_article'
        );
        $article->bindValue(':id_article', $id_article, PDO::PARAM_INT);
        $article->execute();
        $allArticles = $article->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');

        http_response_code(200);
        echo json_encode($allArticles);
    }
});