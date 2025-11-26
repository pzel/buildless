<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script type="importmap">include(`importmap-test.json')</script>
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css">
  </head>
  <body>
   <div id="mocha"></div>
    <script src="https://unpkg.com/mocha/mocha.js"></script>
    <script class="mocha-init">
      mocha.setup("bdd");
      mocha.checkLeaks();
    </script>
    <script type="module" src="test.js"></script>
    <script type="module" class="mocha-exec">
     mocha.run();
    </script>
  </body>

</html>
