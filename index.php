<!DOCTYPE html>
<html>
<head>
    <?php
        $target = 'content';
        $title = 'Directory: ' . substr(getcwd(), 1) . '/' . $target;
        //$host = strtoupper($_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT']);
        $host = gethostbyname(gethostname());

        function list_dir_contents($dir) {
            $list = [];
            $cdir = scandir($dir);
            foreach ($cdir as $subdir) {
                if (substr($subdir, 0, 1) != '.') {
                    $subdirpath = $dir . DIRECTORY_SEPARATOR . $subdir;
                    if (is_dir($subdirpath)) {
                        $list[$subdir] = list_dir_contents($subdirpath);
                    } else {
                        $list[] = $subdir;
                    }
                }
            }
            return $list;
        }
    ?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap" rel="stylesheet">
    <link href="style/style.css" rel="stylesheet">
</head>
<body>
    <div id="container">
        <header id="header">
            <div id="header-content">
                <h1 id="title"><?= $title?></h1>
                <p>Running at: <?= $host?></p>
            </div>
        </header>
        <main id="main"></main>
        <footer id="footer">
            <p>&copy; 2025 &middot; Kasper Kouhia</p>
        </footer>
    </div>
    <script src="app/app.js"></script>
    <script>document.querySelector("#main").appendChild(generateListElements(<?= json_encode(list_dir_contents($target))?>, "<?= $target?>"));</script>
</body>
</html>