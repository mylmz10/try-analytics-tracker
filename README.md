# Try Analytics Tracker

Analytics perform app. Both Tracker and Rest API implementations included in this repository.

## Project Setup
```
npm install
```

### Compiles and hot-reloads for development of tracker js
```
npm run dev
```

### Compiles and minifies for production of tracker js
```
npm run build
```

### Serve compiled files and API
```
npm run start
```

## Using

```
<script src="https://try-analytics-tracker.herokuapp.com/try-analytics.min.js"></script>

<!-- Initialize -->
<script>
    tryAnalytics('Token-XXXX');
</script>
```

## API

API URL: `https://try-analytics-tracker.herokuapp.com/`

Method | Endpoint | Return
------------ | ------------- | -------------
GET | /api/getResult?token=Token-123&url=https://myilmaz.net | JSON


Method | Endpoint | Body | Return
------------ | ------------- | ----------- | -------------
POST | /api/saveResult | JSON | JSON

## Design notes

### Tracker JS implementation

- Promises are widely used to handle async operations. 
- A separate serverConnectors layer is designed to manage the communication with API. If communication protocol changes in feature (like moving to webSocket) only serverConnector classes will be effected. The rest of the implementation will remain same.
- Used environment variables

### API implementation

- A simple http server implementation is done with nodejs and express.
- API and Data Management designed and separated for future implementation
- Used environment variables

### Third-party libraries

- mongoose library used for MongoDB connection
- dotenv library used for environment variables

## Further Improvement ideas

- It may separate router
- Model-View-Controller structure should be implemented
- Token validation should be implemented
- New endpoints should be implemented (Ex: /getResultByDomain, /getResultByToken) 