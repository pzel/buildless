<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script src="https://unpkg.com/@testing-library/dom@10.4.1/dist/@testing-library/dom.umd.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dequal@2.0.3/dist/index.min.js "></script>
    <script type="importmap">include(`importmap-test.json')</script>
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css">
  </head>
  <body>
   <div id="mocha"></div>
    <script src="https://unpkg.com/mocha/mocha.js"></script>
    <script class="mocha-init">
     mocha.setup({ui: "bdd",
                  slow: "200", //ms
                  checkLeaks: "true"
     });
    </script>
    <script type="module" src="test.js"></script>
    <script type="module" class="mocha-exec">
     mocha.run();
    </script>
  </body>
</html>
