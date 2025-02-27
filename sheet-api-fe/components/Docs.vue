<script setup lang="ts">
  //const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <v-container>
    <h1 id="documentation">Documentation</h1>

    <h2 id="getting-started">Getting started</h2>
    <h3 id="recommended">Recommended</h3>

    <ol>
      <li><a href="https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account">Create
        a service account</a></li>
      <li>Share a Google Sheet with the Service Account email address.</li>
      <li>Log in here with Google.</li>
      <li>Go to Settings and add your Google Service Account JSON.</li>
      <li>Go to this app’s Sheets section and click New. Add the Google Sheet ID and save.</li>
      <li>Visit the newly created API endpoint. You should see your Google Sheet in JSON format.</li>
    </ol>

    <h3 id="alternate1">Alternate 1</h3>
    <ol>
      <li>Share your Google Sheet with {{ $config.public.serviceAccountEmail }} .
      </li>
      <li>Go to this app’s Sheets section and click New. Add the Google Sheet ID and save.</li>
      <li>Visit the newly created API endpoint. You should see your Google Sheet in JSON format.</li>
    </ol>

    <h3 id="alternate2">Alternate 2</h3>
    <ol>
      <li>Share your Google Sheet with anybody with the link.</li>
      <li>Go to this app’s Sheets section and click New. Add the Google Sheet ID and save.</li>
      <li>Visit the newly created API endpoint. You should see your Google Sheet in JSON format.</li>
    </ol>


    <h2 id="advanced">Advanced</h2>
    <h3>Authentication</h3>
    <p>If you've assigned an API key, place it into the <code>x-api-key</code> header.
      Alternately, you can put it in the <code>_x-api-key</code> search parameter. Note the underscore.
    </p>

    <h3 id="search">Search</h3>
    <p><code>GET /api/sheet/{sheetuid}/search?search1=param1&searchN=paramN</code></p>
    <h4>Examples</h4>
    <p>Find rows with id > 5 and c = 9: <code>GET /api/sheet/{sheetuid}/search?id=>5&c=9</code></p>
    <p>Find rows with id >= 3 and id &lt; 6: <code>GET /api/sheet/{sheetuid}/search?id=>=3&id=&lt;6</code></p>

    <h3 id="update">Update</h3>
    <p><code>PATCH /api/sheet/{sheetuid}</code></p>
    <h4>Example</h4>
    <p>Update rows with id >= 3 and id &lt; 6</p>
    <p>Body:</p>
    <code><pre>
{
  "query": {
    "logic": "and", // "and" is the default logic
    "rules": {
      "id": [">=3","&lt;6"]
    }
  },
  "update": {
    "column_b": "value_b",
    "column_c": "value_c",
  }
}
    </pre></code>

    <h3 id="delete">Delete</h3>
    <p><code>DELETE /api/sheet/{sheetuid}</code></p>
    <h4>Example</h4>
    <p>Update rows with id >= 3 and id &lt; 6</p>
    <p>Body:</p>
    <code><pre>
{
  "query": {
    "logic": "and", // "and" is the default logic
    "rules": {
      "id": [">=3","&lt;6"]
    }
  }
}
    </pre></code>

    <h3 id="insert">Insert</h3>
    <p><code>PUT /api/sheet/{sheetuid}</code></p>
    <h4>Example</h4>
    <p>Body:</p>
    <code><pre>
{
  "insert": [{
     "column_a": "value_a",
     "column_b": "value_b",
  },{
     "column_a": "value_a",
     "column_b": "value_b",
  }]
}
    </pre></code>


  </v-container>
</template>

<style scoped>
ol, ul {
  padding-left: 1em;
}

h2, h3, h4 {
  margin-bottom: 5px;
  margin-top: 10px;
}

p, h1 {
  padding-bottom: 10px;
}
</style>
