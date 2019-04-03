**Read All**
----
  Returns json data for all records in a specified table.

* **URL**

  /api/comments
  /api/descriptions
  /api/users

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `page=[integer]`
   `pageSize=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[
    {
        "id": 4,
        "videoId": 1,
        "text": "Nam voluptatum quis est dolores sint...",
        "date": "2018-07-31T20:07:53.000Z",
        "userId": 83637
    },
    {
        "id": 5,
        "videoId": 1,
        "text": "Vitae commodi velit. Quae quas sint vero voluptas esse....",
        "date": "2018-12-02T01:12:00.000Z",
        "userId": 56895
    },
    {
        "id": 6,
        "videoId": 1,
        "text": "Doloremque architecto eos quo aut facere in iusto...",
        "date": "2019-03-12T05:03:46.000Z",
        "userId": 58650
    }
]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
      **Content:** `Sorry, those aren't the correct params for this route!`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/comments?page=2&pageSize=3",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });

**Read One**
----
  Returns json data for one record in the specified table.

* **URL**

  /api/comments
  /api/descriptions
  /api/users

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 744681,
    "videoId": 744681,
    "text": "Necessitatibus totam facilis quia in sed est officia inventore nihil...",
    "likes": 752315,
    "categories": [
        "People & Blogs",
        "Auto & Vehicles"
    ]
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
      **Content:** `Sorry, those aren't the correct params for this route!`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/descriptions?id=744681",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });

**Create**
----
  Creates a record in the specified table and returns json data for the record created.

* **URL**

  /api/comments
  /api/descriptions
  /api/users

* **Method:**

  `POST`
  
*  **Request Body Example**
 
   `{videoId: 1, text: "I'm the 'C' in CRUD!!", userId: 10, date: "2019-02-12T00:02:05.000Z"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 50000008,
    "videoId": 1,
    "text": "I'm the 'C' in CRUD!!",
    "userId": 10,
    "date": "2019-02-12T00:02:05.000Z"
    }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/comments",
      dataType: "json",
      type : "POST",
      data: {
        "videoId": 1,
        "text": "I'm the 'C' in CRUD!!",
        "userId": 10,
        "date": "2019-02-12T00:02:05.000Z"
       }
      success : function(r) {
        console.log(r);
      }
    });
    
**Update**
----
  Updates a record in the specified table and returns json data showing the number of records updated.

* **URL**

  /api/comments
  /api/descriptions
  /api/users

*  **URL Params**

   **Required:**
 
   `id=[integer]`
  
*  **Request Body Example**
 
   `{text: "And I'm the 'U'!!"}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[1]`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/comments",
      dataType: "json",
      type : "PUT",
      data: {
        "text": "And I'm the 'U'!!",
       }
      success : function(r) {
        console.log(r);
      }
    });
 
 **Delete**
----
  Deletes a record in the specified table and returns the number of records that were deleted (should always be 1).

* **URL**

  /api/comments
  /api/descriptions
  /api/users

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `1`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/comments?id=10000",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
