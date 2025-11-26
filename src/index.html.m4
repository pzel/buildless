<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- no ESM module for pouchdb yet -->
    <script src="https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js"></script>
    <script type="importmap">m4_include(`importmap.json')
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="module" src="/main.js"> </script>
</html>
