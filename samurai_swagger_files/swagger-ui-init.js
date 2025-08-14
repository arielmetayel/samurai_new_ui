
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Samurai v2 API",
      "description": "Samurai v2 API description",
      "version": "2.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Samurai",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDTO": {
          "type": "object",
          "properties": {}
        },
        "CopyInstanceDto": {
          "type": "object",
          "properties": {}
        }
      }
    },
    "paths": {
      "/v2/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "summary": "Generate access token object for user by username and password",
          "requestBody": {
            "description": "User credentials",
            "required": true,
            "content": {
              "application/x-www-form-urlencoded": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "username": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    },
                    "client_id": {
                      "type": "string"
                    },
                    "client_secret": {
                      "type": "string"
                    },
                    "grant_type": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "accessToken": {
                        "type": "string"
                      },
                      "accessTokenExpiresAt": {
                        "type": "string"
                      },
                      "refreshToken": {
                        "type": "string"
                      },
                      "refreshTokenExpiresAt": {
                        "type": "string"
                      },
                      "client": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      },
                      "user": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/v2/auth/logout": {
        "post": {
          "operationId": "AuthController_logout",
          "summary": "Perform background logout",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/v2/auth/ms-signin": {
        "get": {
          "operationId": "AuthController_msSignIn",
          "summary": "Generate Microsoft login url",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "location": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/v2/auth/ms-get-info": {
        "get": {
          "operationId": "AuthController_getMSInfo",
          "summary": "Get Microsoft user info",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "displayName": {
                        "type": "string"
                      },
                      "givenName": {
                        "type": "string"
                      },
                      "surname": {
                        "type": "string"
                      },
                      "userPrincipalName": {
                        "type": "string"
                      },
                      "businessPhones": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      },
                      "jobTitle": {
                        "type": "string"
                      },
                      "mail": {
                        "type": "string"
                      },
                      "mobilePhone": {
                        "type": "string"
                      },
                      "officeLocation": {
                        "type": "string"
                      },
                      "preferredLanguage": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/auth/ms-login": {
        "get": {
          "operationId": "AuthController_getMsLogin",
          "summary": "Microsoft login callback",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "code": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Auth"
          ]
        },
        "post": {
          "operationId": "AuthController_msLogin",
          "summary": "Microsoft login callback processing",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "token": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/v2/jobtype/list-generic-templates": {
        "get": {
          "operationId": "JobtypeController_listGenericTemplates",
          "summary": "List generic templates",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "template": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/templates": {
        "get": {
          "operationId": "JobtypeController_listTemplates",
          "summary": "List templates",
          "parameters": [
            {
              "name": "show_generic",
              "in": "query",
              "description": "Show generic templates",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "template": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobtype/save-generic-template": {
        "post": {
          "operationId": "JobtypeController_saveGenericTemplate",
          "summary": "Save generic template",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "template": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/{id}/generic-template": {
        "delete": {
          "operationId": "JobtypeController_deleteGenericTemplate",
          "summary": "Delete generic template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Generic template id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/{id}/template": {
        "delete": {
          "operationId": "JobtypeController_deleteLocalTemplate",
          "summary": "Delete local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Local template id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "JobtypeController_hasTemplate",
          "summary": "Get local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Local template id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "JobtypeController_saveTemplate",
          "summary": "Save local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Job type id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobtype/template/{id}": {
        "post": {
          "operationId": "JobtypeController_createFromTemplate",
          "summary": "Create job type from template",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "from_generic": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Template id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobtype": {
        "get": {
          "operationId": "JobtypeController_list",
          "summary": "List job types",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Jobtype"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "JobtypeController_create",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Data of the new Job type",
                        "properties": {
                          "title": {
                            "type": "string",
                            "description": "Title of the Job type"
                          },
                          "_id": {
                            "type": "string",
                            "description": "Internal ID of the job type"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/{id}": {
        "get": {
          "operationId": "JobtypeController_view",
          "summary": "View Jobtype",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "icon": {
                        "type": "number",
                        "description": "Job type asset ID"
                      },
                      "settings": {
                        "type": "object",
                        "description": "Settings object for the job type"
                      },
                      "requiredSkills": {
                        "type": "array",
                        "description": "Required skills list object"
                      },
                      "title": {
                        "type": "string",
                        "description": "Title of the job type"
                      },
                      "id": {
                        "type": "string",
                        "description": "ID of the Job type"
                      },
                      "hasJobs": {
                        "type": "boolean",
                        "description": "Flag, if the job type has assigned jobs"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Jobtype not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        },
        "put": {
          "operationId": "JobtypeController_update",
          "summary": "Update job type data",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "description": "Title of the job type"
                    },
                    "icon": {
                      "type": "number",
                      "description": "Asset ID of the icon for the Job type"
                    },
                    "settings": {
                      "type": "object",
                      "description": "Settings for the job type"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated job data",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Data of the updated job type",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Internal ID of the updated job type"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Job type not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        },
        "delete": {
          "operationId": "JobtypeController_delete",
          "summary": "Delete job type",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "403": {
              "description": "Job type has assigned jobs and could not be deleted"
            },
            "404": {
              "description": "Job type not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/{id}/questions": {
        "get": {
          "operationId": "JobtypeController_getQuestions",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Question list for the given job type",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "ID": {
                        "type": "number",
                        "description": "Displayed ID of the Job Type"
                      },
                      "description": {
                        "type": "string",
                        "description": "Description of the question"
                      },
                      "id": {
                        "type": "string",
                        "description": "Internal ID of the question"
                      },
                      "isGlobal": {
                        "type": "boolean",
                        "description": "Flag if the question is marked as global"
                      },
                      "jobType": {
                        "type": "string",
                        "description": "Internal ID of the Job Type that the questions is assigned to"
                      },
                      "settings": {
                        "type": "object",
                        "description": "Settings object of the question"
                      },
                      "title": {
                        "type": "string",
                        "description": "Title of the question"
                      },
                      "type": {
                        "type": "number",
                        "description": "Type of the questions"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Job type not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/jobtype/{id}/reorder-questions": {
        "put": {
          "operationId": "JobtypeController_reorderQuestions",
          "summary": "Reorder job type questions",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "questions": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Internal ID of the question"
                          },
                          "sequence": {
                            "type": "number",
                            "description": "New sequence of the question"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Job type question reordered",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Job type not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Jobtype"
          ]
        }
      },
      "/v2/report/{id}/column": {
        "patch": {
          "operationId": "ReportController_updateColumn",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/files": {
        "get": {
          "operationId": "ReportController_downloadFiles",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ]
        }
      },
      "/v2/report/export/xlsx/{id}": {
        "post": {
          "operationId": "ReportController_exportXlsx",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/export/pdf/{id}": {
        "post": {
          "operationId": "ReportController_exportPdf",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/dashboard": {
        "get": {
          "operationId": "ReportController_dashboard",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/questions": {
        "get": {
          "operationId": "ReportController_getReportQuestions",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/counters": {
        "get": {
          "operationId": "ReportController_getReportCounters",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/paginated": {
        "get": {
          "operationId": "ReportController_viewPaginated",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/files/{job}": {
        "get": {
          "operationId": "ReportController_getReportJobFiles",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "job",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}": {
        "patch": {
          "operationId": "ReportController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ReportController_deleteReport",
          "summary": "Delete report",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Report not found"
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ReportController_viewReport",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ]
        }
      },
      "/v2/report/{id}/refresh": {
        "get": {
          "operationId": "ReportController_refresh",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report": {
        "post": {
          "operationId": "ReportController_createReport",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ReportController_listReports",
          "summary": "List reports",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of reports",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "filters": {
                        "type": "array"
                      },
                      "columns": {
                        "type": "array"
                      },
                      "settings": {
                        "type": "object"
                      },
                      "public": {
                        "type": "boolean"
                      },
                      "leadership": {
                        "type": "boolean"
                      },
                      "saved": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/clone": {
        "post": {
          "operationId": "ReportController_cloneReport",
          "summary": "Clone report",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Internal ID of the project",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Clone operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "id": {
                        "type": "string",
                        "description": "Internal ID of the new report"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Report could not be cloned at this moment",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Message of the error"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Report not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/template": {
        "post": {
          "operationId": "ReportController_createLocalTemplate",
          "summary": "Create local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report id",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "ReportController_deleteLocalTemplate",
          "summary": "Delete local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ReportController_hasTemplate",
          "summary": "Get local template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/list-generic-templates": {
        "get": {
          "operationId": "ReportController_listGenericTemplates",
          "summary": "List generic templates",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of generic templates",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "filters": {
                        "type": "array"
                      },
                      "columns": {
                        "type": "array"
                      },
                      "settings": {
                        "type": "object"
                      },
                      "public": {
                        "type": "boolean"
                      },
                      "leadership": {
                        "type": "boolean"
                      },
                      "saved": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ]
        }
      },
      "/v2/report/save-generic-template": {
        "post": {
          "operationId": "ReportController_saveGenericTemplate",
          "summary": "Save generic template",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "type": {
                      "type": "string"
                    },
                    "filters": {
                      "type": "array"
                    },
                    "columns": {
                      "type": "array"
                    },
                    "settings": {
                      "type": "object"
                    },
                    "public": {
                      "type": "boolean"
                    },
                    "leadership": {
                      "type": "boolean"
                    },
                    "saved": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ]
        }
      },
      "/v2/report/templates": {
        "get": {
          "operationId": "ReportController_listTemplates",
          "summary": "List templates",
          "parameters": [
            {
              "name": "show_generic",
              "in": "query",
              "description": "Show generic templates",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "List of templates",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/template-by-id": {
        "delete": {
          "operationId": "ReportController_deleteLocalTemplateById",
          "summary": "Delete local template by ID",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report template id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/report/{id}/generic-template": {
        "delete": {
          "operationId": "ReportController_deleteGenericTemplate",
          "summary": "Delete generic template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ]
        }
      },
      "/v2/report/template/{id}": {
        "post": {
          "operationId": "ReportController_createFromTemplate",
          "summary": "Create report from template",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Report id",
              "required": true
            }
          ],
          "requestBody": {
            "description": "Report data",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "from_generic": {
                      "type": "boolean"
                    },
                    "filters": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            }
          },
          "tags": [
            "Reports"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobs": {
        "get": {
          "operationId": "JobController_index",
          "summary": "Get list of jobs",
          "description": "Get list of jobs",
          "parameters": [],
          "responses": {
            "200": {
              "description": "List of jobs"
            }
          },
          "tags": [
            "Jobs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "JobController_create",
          "summary": "Create job",
          "description": "Create job",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string"
                    },
                    "jobType": {
                      "type": "string"
                    },
                    "startDate": {
                      "type": "string"
                    },
                    "users": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "prev_job": {
                      "type": "string"
                    },
                    "project": {
                      "type": "string"
                    },
                    "files": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "avatar": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Job created"
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Jobs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobs/shift_view": {
        "get": {
          "operationId": "JobController_shiftView",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}": {
        "get": {
          "operationId": "JobController_view",
          "summary": "Get job by id",
          "description": "Get job by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Job"
            }
          },
          "tags": [
            "Jobs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "JobController_updateJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        },
        "delete": {
          "operationId": "JobController_deleteJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/feeds": {
        "get": {
          "operationId": "JobController_feeds",
          "summary": "Get job feeds",
          "description": "Get job feeds",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Job feeds"
            }
          },
          "tags": [
            "Jobs"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/jobs/{id}/export": {
        "get": {
          "operationId": "JobController_exportJobPdf",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/assign_multiple": {
        "put": {
          "operationId": "JobController_assignMultiple",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/clone": {
        "post": {
          "operationId": "JobController_clonetJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/multiple": {
        "delete": {
          "operationId": "JobController_deleteMultipleJobs",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/visit": {
        "put": {
          "operationId": "JobController_visitJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/add_prev/{source}": {
        "put": {
          "operationId": "JobController_addPreviousJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "source",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/remove_prev/{target}": {
        "put": {
          "operationId": "JobController_removePreviousJob",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "target",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/assign_many": {
        "post": {
          "operationId": "JobController_assignManyToMany",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/assign": {
        "put": {
          "operationId": "JobController_assignUser",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/jobs/{id}/attendance/{userId}": {
        "put": {
          "operationId": "JobController_toggleAttendance",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Jobs"
          ]
        }
      },
      "/v2/blueprints": {
        "get": {
          "operationId": "BlueprintController_index",
          "summary": "Get all blueprints",
          "description": "Get all blueprints",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/blueprints/markings": {
        "get": {
          "operationId": "BlueprintController_markings",
          "summary": "Get all blueprints markings",
          "description": "Get all blueprints markings",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/blueprints/markings/export": {
        "post": {
          "operationId": "BlueprintController_exportMarkings",
          "summary": "Export blueprints markings",
          "description": "Export blueprints markings",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/blueprints/{job}/{question}": {
        "put": {
          "operationId": "BlueprintController_update",
          "summary": "Update blueprint",
          "description": "Update blueprint",
          "parameters": [
            {
              "name": "job",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "question",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "description": "Blueprint data",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "job": {
                      "type": "string"
                    },
                    "file": {
                      "type": "string"
                    },
                    "question": {
                      "type": "string"
                    },
                    "elements": {
                      "type": "array"
                    },
                    "measurements": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/blueprints/{id}": {
        "delete": {
          "operationId": "BlueprintController_delete",
          "summary": "Delete blueprint",
          "description": "Delete blueprint",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ]
        }
      },
      "/v2/blueprints/element/{id}": {
        "delete": {
          "operationId": "BlueprintController_deleteElement",
          "summary": "Delete blueprint element",
          "description": "Delete blueprint element",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "job": {
                        "type": "string"
                      },
                      "file": {
                        "type": "string"
                      },
                      "question": {
                        "type": "string"
                      },
                      "elements": {
                        "type": "array"
                      },
                      "measurements": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Blueprints"
          ]
        }
      },
      "/v2/asset/{id}/rotate": {
        "post": {
          "operationId": "AssetController_rotateAsset",
          "summary": "Rotate asset",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Asset ID",
              "required": true
            }
          ],
          "requestBody": {
            "description": "Asset rotation",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "rotation": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset/pdf-images": {
        "get": {
          "operationId": "AssetController_listPdfImages",
          "summary": "Get PDF images",
          "parameters": [
            {
              "name": "pdf",
              "in": "query",
              "description": "PDF ID",
              "required": true
            },
            {
              "name": "get_sizes",
              "in": "query",
              "description": "Get PDF images sizes",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "parent": {
                        "type": "number"
                      },
                      "children": {
                        "type": "array",
                        "items": {
                          "type": "number"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset/pdf-resize/{id}": {
        "post": {
          "operationId": "AssetController_pdfResizeAsset",
          "summary": "Resize PDF",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "PDF ID",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset/pdf-resize": {
        "post": {
          "operationId": "AssetController_pdfResize",
          "summary": "Resize PDF",
          "parameters": [
            {
              "name": "file",
              "in": "header",
              "description": "PDF file",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset/upload": {
        "post": {
          "operationId": "AssetController_uploadFile",
          "summary": "Upload file",
          "parameters": [
            {
              "name": "file",
              "in": "header",
              "description": "File",
              "required": true
            },
            {
              "name": "private_asset",
              "in": "query",
              "description": "Private asset",
              "required": false
            },
            {
              "name": "target_user",
              "in": "query",
              "description": "Target user",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset/info/{id}": {
        "get": {
          "operationId": "AssetController_getAssetInfo",
          "summary": "Get asset info",
          "description": "Get asset info",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Asset id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "name": {
                        "type": "string"
                      },
                      "size": {
                        "type": "number"
                      },
                      "type": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      },
                      "isPrivate": {
                        "type": "boolean"
                      },
                      "targetUser": {
                        "type": "string"
                      },
                      "createdAt": {
                        "type": "string"
                      },
                      "updatedAt": {
                        "type": "string"
                      },
                      "deletedAt": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "error": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Assets"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/asset": {
        "get": {
          "operationId": "AssetController_listAssets",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Assets"
          ]
        }
      },
      "/v2/asset/{id}": {
        "delete": {
          "operationId": "AssetController_deleteAsset",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Assets"
          ]
        }
      },
      "/v2/asset/{target}/{source}": {
        "patch": {
          "operationId": "AssetController_replaceAsset",
          "parameters": [
            {
              "name": "source",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "target",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Assets"
          ]
        }
      },
      "/v2/asset/zip": {
        "get": {
          "operationId": "AssetController_downloadAllFiles",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Assets"
          ]
        }
      },
      "/v2/asset/download/{id}": {
        "get": {
          "operationId": "AssetController_downloadFile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Assets"
          ]
        }
      },
      "/v2/games": {
        "get": {
          "operationId": "GameController_index",
          "summary": "Get all games",
          "description": "Get all games",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "page": {
                        "type": "number"
                      },
                      "page_size": {
                        "type": "number"
                      },
                      "total": {
                        "type": "number"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            },
                            "score": {
                              "type": "number"
                            },
                            "user": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "email": {
                                  "type": "string"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "avatar": {
                                  "type": "string"
                                },
                                "role": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Games"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/games/{id}": {
        "get": {
          "operationId": "GameController_view",
          "summary": "Get game by id",
          "description": "Get game by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string"
                      },
                      "score": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Games"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/games/{id}/highscore": {
        "get": {
          "operationId": "GameController_getScore",
          "summary": "Get highscore by game id",
          "description": "Get highscore by game id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "number"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Games"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "GameController_createScore",
          "summary": "Create highscore by game id",
          "description": "Create highscore by game id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "score": {
                      "type": "number"
                    },
                    "type": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string"
                      },
                      "type": {
                        "type": "string"
                      },
                      "score": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          },
          "tags": [
            "Games"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/token": {
        "post": {
          "operationId": "UserController_token",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/activities": {
        "get": {
          "operationId": "UserController_getUserActivities",
          "summary": "Get user activities",
          "description": "Get user activities",
          "parameters": [
            {
              "name": "user",
              "in": "query",
              "description": "User ID",
              "required": false
            },
            {
              "name": "page",
              "in": "query",
              "description": "Page number",
              "required": false
            },
            {
              "name": "page_size",
              "in": "query",
              "description": "Page size",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "user": {
                              "type": "string"
                            },
                            "action": {
                              "type": "string"
                            },
                            "message": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/me": {
        "get": {
          "operationId": "UserController_myDetails",
          "summary": "Get user details",
          "description": "Get user details",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "phoneNumber": {
                        "type": "string"
                      },
                      "terms_and_privacy": {
                        "type": "boolean"
                      },
                      "role": {
                        "type": "string"
                      },
                      "imgurl": {
                        "type": "string"
                      },
                      "notifications": {
                        "type": "boolean"
                      },
                      "imgUrl": {
                        "type": "string"
                      },
                      "language": {
                        "type": "string"
                      },
                      "calendarEnabled": {
                        "type": "boolean"
                      },
                      "social": {
                        "type": "object"
                      },
                      "msAuth": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/ms-connect": {
        "put": {
          "operationId": "UserController_msConnect",
          "summary": "Connect user to MS",
          "description": "Connect user to MS",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "code": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/register": {
        "put": {
          "operationId": "UserController_register",
          "summary": "Register user",
          "description": "Register user",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "phoneNumber": {
                      "type": "string"
                    },
                    "terms_and_privacy": {
                      "type": "boolean"
                    },
                    "avatar": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    },
                    "token": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "email": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/shift_view": {
        "get": {
          "operationId": "UserController_shiftView",
          "summary": "Get shifts",
          "description": "Get shifts",
          "parameters": [
            {
              "name": "from",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            },
            {
              "name": "to",
              "required": true,
              "in": "query",
              "schema": {
                "format": "date-time",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "users": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "name": {
                                  "type": "string"
                                },
                                "email": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users": {
        "get": {
          "operationId": "UserController_findAll",
          "summary": "Get users",
          "description": "Get users",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "docs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "email": {
                              "type": "string"
                            },
                            "role": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "UserController_create",
          "summary": "Create user",
          "description": "Create user",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDTO"
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "name": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "role": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Conflict",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/forgot_password": {
        "post": {
          "operationId": "UserController_forgotPassword",
          "summary": "Forgot password",
          "description": "Forgot password",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/forgot_password/reset_password/{email}": {
        "put": {
          "operationId": "UserController_resetPasswordByEmail",
          "summary": "Reset password",
          "description": "Reset password",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [
            {
              "name": "email",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/forgot_password/validate_token/{token}": {
        "get": {
          "operationId": "UserController_validateResetPasswordToken",
          "summary": "Validate reset password token",
          "description": "Validate reset password token",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "generatedAt": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/reinvite": {
        "post": {
          "operationId": "UserController_reinvite",
          "summary": "Reinvite user",
          "description": "Reinvite user",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "email": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/ban": {
        "put": {
          "operationId": "UserController_ban",
          "summary": "Ban user",
          "description": "Ban user",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "email": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/confirm/{token}": {
        "put": {
          "operationId": "UserController_confirm",
          "summary": "Confirm user",
          "description": "Confirm user",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "role": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/{id}": {
        "get": {
          "operationId": "UserController_view",
          "summary": "Get user",
          "description": "Get user",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "role": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "UserController_update",
          "summary": "Update user",
          "description": "Update user",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "notifications": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "imgUrl": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "terms_and_privacy": {
                      "type": "boolean"
                    },
                    "phoneNumber": {
                      "type": "string"
                    },
                    "role": {
                      "type": "string"
                    },
                    "about": {
                      "type": "string"
                    },
                    "valid": {
                      "type": "boolean"
                    },
                    "banned": {
                      "type": "boolean"
                    },
                    "language": {
                      "type": "string"
                    },
                    "inTraining": {
                      "type": "boolean"
                    },
                    "calendarEnabled": {
                      "type": "boolean"
                    },
                    "acceptedLocation": {
                      "type": "boolean"
                    },
                    "companies": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "client_projects": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "email": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    },
                    "newPassword": {
                      "type": "string"
                    },
                    "dateOfBirth": {
                      "type": "string"
                    },
                    "personalId": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "files": {
                          "type": "array",
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    "drivingLicense": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "form101": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "cv": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "homeAddress": {
                      "type": "object",
                      "properties": {
                        "lat": {
                          "type": "number"
                        },
                        "long": {
                          "type": "number"
                        },
                        "address": {
                          "type": "string"
                        }
                      }
                    },
                    "maComplete": {
                      "type": "string"
                    },
                    "bankDetails": {
                      "type": "string"
                    },
                    "startDate": {
                      "type": "string"
                    },
                    "employeeRecommendation": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "employyAgreement": {
                      "type": "object",
                      "properties": {
                        "value": {
                          "type": "string"
                        },
                        "files": {
                          "type": "array",
                          "items": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    "workSafetyPermit": {
                      "type": "array",
                      "items": {
                        "type": "number"
                      }
                    },
                    "shoeSize": {
                      "type": "number"
                    },
                    "shirtSize": {
                      "type": "string"
                    },
                    "coatSize": {
                      "type": "string"
                    },
                    "harnessNumber": {
                      "type": "string"
                    },
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "role": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "UserController_delete",
          "summary": "Delete user",
          "description": "Delete user",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "role": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/remove": {
        "post": {
          "operationId": "UserController_deleteBulk",
          "summary": "Delete users",
          "description": "Delete users",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "email": {
                              "type": "string"
                            },
                            "role": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/{id}/notifications": {
        "get": {
          "operationId": "UserController_notifications",
          "summary": "Get user notifications",
          "description": "Get user notifications",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/users/{email}/calendar": {
        "get": {
          "operationId": "UserController_calendar",
          "summary": "Get user calendar",
          "description": "Get user calendar",
          "parameters": [
            {
              "name": "email",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/users/subscribe/{id}": {
        "post": {
          "operationId": "UserController_subcribe",
          "summary": "Subscribe user to push notifications",
          "description": "Subscribe user to push notifications",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "subscription": {
                      "type": "object",
                      "properties": {
                        "endpoint": {
                          "type": "string"
                        },
                        "keys": {
                          "type": "object",
                          "properties": {
                            "p256dh": {
                              "type": "string"
                            },
                            "auth": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Users"
          ]
        }
      },
      "/v2/automations": {
        "get": {
          "operationId": "AutomationController_listAutomations",
          "summary": "List automations",
          "parameters": [
            {
              "name": "deleted",
              "in": "query",
              "description": "Whether to include deleted automations",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            }
          },
          "tags": [
            "Automations"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/automations/logs/{id}": {
        "get": {
          "operationId": "AutomationController_viewLog",
          "summary": "View automation log",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Automation log ID",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "log": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Automations"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/automations/{id}/logs": {
        "get": {
          "operationId": "AutomationController_listAutomationLogs",
          "summary": "List automation logs",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Automation ID",
              "required": true
            },
            {
              "name": "page",
              "in": "query",
              "description": "Page number",
              "required": false
            },
            {
              "name": "page_size",
              "in": "query",
              "description": "Page size",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "log": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "page": {
                        "type": "number"
                      },
                      "page_size": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/topics": {
        "get": {
          "operationId": "AutomationController_topics",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/events": {
        "post": {
          "operationId": "AutomationController_events",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/conditions": {
        "post": {
          "operationId": "AutomationController_conditions",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/actions": {
        "post": {
          "operationId": "AutomationController_actions",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/actions-config": {
        "post": {
          "operationId": "AutomationController_actionsConfig",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/complete": {
        "post": {
          "operationId": "AutomationController_complete",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/rename": {
        "post": {
          "operationId": "AutomationController_rename",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/handler/{id}": {
        "all": {
          "operationId": "AutomationController_testHandler",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/{id}/incoming": {
        "get": {
          "operationId": "AutomationController_incoming",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/test/{id}": {
        "post": {
          "operationId": "AutomationController_testWebhook",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/{id}": {
        "delete": {
          "operationId": "AutomationController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/automations/{id}/state": {
        "put": {
          "operationId": "AutomationController_toggle",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Automations"
          ]
        }
      },
      "/v2/apps/toggles": {
        "get": {
          "operationId": "AppsController_getToggles",
          "summary": "Get all toggles",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "toggleId": {
                          "type": "string"
                        },
                        "toggleName": {
                          "type": "string"
                        },
                        "toggleDescription": {
                          "type": "string"
                        },
                        "image": {
                          "type": "string"
                        },
                        "isActive": {
                          "type": "boolean"
                        },
                        "settings": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/{id}/active": {
        "get": {
          "operationId": "AppsController_isToggleActive",
          "summary": "Check if toggle is active",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Toggle id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "active": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/toggles/{id}": {
        "put": {
          "operationId": "AppsController_toggleApp",
          "summary": "Toggle app",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Toggle id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "toggles": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "toggleId": {
                              "type": "string"
                            },
                            "toggleName": {
                              "type": "string"
                            },
                            "toggleDescription": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "isActive": {
                              "type": "boolean"
                            },
                            "settings": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/bootstrap": {
        "get": {
          "operationId": "AppsController_bootstrap",
          "summary": "Bootstrap platform",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "host": {
                        "type": "string"
                      },
                      "toggles": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "toggleId": {
                              "type": "string"
                            },
                            "toggleName": {
                              "type": "string"
                            },
                            "toggleDescription": {
                              "type": "string"
                            },
                            "image": {
                              "type": "string"
                            },
                            "isActive": {
                              "type": "boolean"
                            },
                            "settings": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/{id}/settings": {
        "post": {
          "operationId": "AppsController_saveAppSettings",
          "summary": "Save app settings",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "App id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "AppsController_getAppSettings",
          "summary": "Get app settings",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "App id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/client/state/{screen}": {
        "get": {
          "operationId": "AppsController_getScreenState",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "AppsController_saveScreenState",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/apps/client/state/byId/{id}": {
        "get": {
          "operationId": "AppsController_getScreenStateById",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Apps"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/microsoft/join-channel/{id}": {
        "get": {
          "operationId": "MicrosoftController_joinChannel",
          "summary": "Join channel",
          "description": "Join channel",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Project ID",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "message": {
                        "type": "string"
                      },
                      "webUrl": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Microsoft"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/microsoft/me/calendar": {
        "get": {
          "operationId": "MicrosoftController_getMsUserCalendarEvents",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Microsoft"
          ]
        }
      },
      "/v2/microsoft/team/{id}": {
        "get": {
          "operationId": "MicrosoftController_getTeam",
          "summary": "Get team",
          "description": "Get team",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Project ID",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "displayName": {
                            "type": "string"
                          },
                          "description": {
                            "type": "string"
                          },
                          "id": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Microsoft"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/microsoft/teams": {
        "get": {
          "operationId": "MicrosoftController_listTeams",
          "summary": "List teams",
          "description": "List teams",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "displayName": {
                              "type": "string"
                            },
                            "id": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Microsoft"
          ]
        }
      },
      "/v2/video/webhook": {
        "post": {
          "operationId": "VideoController_webhook",
          "summary": "Webhook for video processing",
          "requestBody": {
            "description": "Webhook data",
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "job_id": {
                      "type": "string"
                    },
                    "data": {
                      "type": "object",
                      "properties": {
                        "status": {
                          "type": "string"
                        },
                        "completed_at": {
                          "type": "string"
                        },
                        "outputs": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "url": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success"
            },
            "404": {
              "description": "Not found"
            }
          },
          "tags": [
            "Video"
          ]
        }
      },
      "/v2/projects/{id}/feeds": {
        "get": {
          "operationId": "ProjectController_getProjectFeeds",
          "summary": "Get project feeds",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Project id",
              "required": true
            },
            {
              "name": "page",
              "in": "query",
              "description": "Page number",
              "required": false
            },
            {
              "name": "page_size",
              "in": "query",
              "description": "Page size",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Projects"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/projects": {
        "post": {
          "operationId": "ProjectController_createProject",
          "summary": "Create project",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "avatar": {
                      "type": "string"
                    },
                    "users": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "projectManagers": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Projects"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "get": {
          "operationId": "ProjectController_index",
          "summary": "Project list",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "limit": {
                        "type": "number",
                        "description": "Limit of the items"
                      },
                      "page": {
                        "type": "number",
                        "description": "Current page"
                      },
                      "pages": {
                        "type": "number",
                        "description": "Total pages"
                      },
                      "total": {
                        "type": "number",
                        "description": "Total items"
                      },
                      "docs": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "ID": {
                              "type": "number",
                              "description": "External ID of the project"
                            },
                            "avatar": {
                              "type": "string",
                              "description": "Asset ID of the project avatar"
                            },
                            "created_at": {
                              "type": "string",
                              "description": "Project creation date"
                            },
                            "files": {
                              "type": "array",
                              "description": "List of project files"
                            },
                            "id": {
                              "type": "string",
                              "description": "Internal ID of the project"
                            },
                            "jobs": {
                              "type": "object",
                              "description": "Job statuses presented in object"
                            },
                            "name": {
                              "type": "string",
                              "description": "Name of the project"
                            },
                            "softDelete": {
                              "type": "boolean",
                              "description": "Flag if the project is soft deleted"
                            },
                            "updated_at": {
                              "type": "string",
                              "description": "Last update time"
                            },
                            "users": {
                              "type": "array",
                              "description": "List of project users"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/{id}/clone": {
        "post": {
          "operationId": "ProjectController_cloneProject",
          "summary": "Clone project",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Projects"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/projects/{id}": {
        "put": {
          "operationId": "ProjectController_update",
          "summary": "Update project details",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "avatar": {
                      "type": "number",
                      "description": "Asset ID of the project avatar"
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the project"
                    },
                    "users": {
                      "type": "array",
                      "description": "List of assigned user IDs"
                    },
                    "projectManagers": {
                      "type": "array",
                      "description": "List of assigned project manager IDs"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Project Updated",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Response information",
                        "properties": {
                          "id": {
                            "type": "string",
                            "description": "Updated project internal ID"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Project not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        },
        "delete": {
          "operationId": "ProjectController_delete",
          "summary": "Delete a project",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete operation",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "The project has assigned job and cannot be deleted"
            },
            "404": {
              "description": "Project not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        },
        "get": {
          "operationId": "ProjectController_view",
          "summary": "View project",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Project details",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "description": "Internal ID of the project"
                          },
                          "users": {
                            "type": "array",
                            "description": "List of project users"
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the project"
                          },
                          "avatar": {
                            "type": "string",
                            "description": "Asset ID of the project avatar"
                          },
                          "created_at": {
                            "type": "string",
                            "description": "Creation date"
                          },
                          "updated_at": {
                            "type": "string",
                            "description": "Last updated date"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Project not found or you do not have access to this project"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/companies": {
        "get": {
          "operationId": "ProjectController_getCompanies",
          "summary": "List project companies",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/dashboard": {
        "get": {
          "operationId": "ProjectController_dashboard",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/all": {
        "get": {
          "operationId": "ProjectController_all",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "docs": {
                        "type": "array",
                        "description": "Project details",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "description": "Internal ID of the project"
                          },
                          "users": {
                            "type": "array",
                            "description": "List of project users"
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the project"
                          },
                          "avatar": {
                            "type": "string",
                            "description": "Asset ID of the project avatar"
                          },
                          "created_at": {
                            "type": "string",
                            "description": "Creation date"
                          },
                          "updated_at": {
                            "type": "string",
                            "description": "Last updated date"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/{id}/cover": {
        "get": {
          "operationId": "ProjectController_cover",
          "summary": "Get basic project details",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "Name of the project"
                      },
                      "projectManagers": {
                        "type": "array",
                        "description": "List of project users"
                      },
                      "background": {
                        "type": "string",
                        "description": "Asset ID of the project avatar"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Project not found or you do not have access to the project"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/{id}/fields": {
        "patch": {
          "operationId": "ProjectController_updateProjectFields",
          "summary": "Update project fields",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "You do not have access to the field"
            },
            "404": {
              "description": "Project not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/fields/list/{group}": {
        "get": {
          "operationId": "ProjectController_getSuggestionForGroups",
          "parameters": [
            {
              "name": "group",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/fields/list": {
        "post": {
          "operationId": "ProjectController_createListSuggestion",
          "summary": "Save list suggestion",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "value": {
                      "type": "string",
                      "description": "Value of the item"
                    },
                    "group": {
                      "type": "string",
                      "description": "Group of the item"
                    },
                    "isPrivate": {
                      "type": "boolean",
                      "description": "Private flag for the item"
                    },
                    "project": {
                      "type": "string",
                      "description": "Project that the item is assigned to"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Item created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Data of the saved item",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "description": "Internal ID of the item"
                          },
                          "value": {
                            "type": "string",
                            "description": "Value of the item"
                          },
                          "group": {
                            "type": "string",
                            "description": "Group name of the item"
                          },
                          "project": {
                            "type": "string",
                            "description": "Project internal ID that the item assigned to"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/fields/list/bulk": {
        "post": {
          "operationId": "ProjectController_createListSuggestionBulk",
          "summary": "Save list suggestions",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Item created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "array",
                        "description": "Array of saved item data",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string",
                              "description": "Internal ID of the item"
                            },
                            "value": {
                              "type": "string",
                              "description": "Value of the item"
                            },
                            "group": {
                              "type": "string",
                              "description": "Group name of the item"
                            },
                            "project": {
                              "type": "string",
                              "description": "Project internal ID that the item is assigned to"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/{id}/fields/visibility": {
        "post": {
          "operationId": "ProjectController_changeFieldVisibility",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/fields/list/{id}": {
        "delete": {
          "operationId": "ProjectController_deleteSuggestion",
          "summary": "Remove suggestion by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Delete suggestion data"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/projects/fields/values": {
        "get": {
          "operationId": "ProjectController_listProjectFieldValues",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Projects"
          ]
        }
      },
      "/v2/instances/taken/{name}": {
        "get": {
          "operationId": "InstanceController_getInstanceByName",
          "summary": "Check if instance name is taken",
          "parameters": [
            {
              "name": "name",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Instance name is taken"
            },
            "400": {
              "description": "Something went wrong"
            },
            "404": {
              "description": "Instance name is not taken"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/{id}/template": {
        "get": {
          "operationId": "InstanceController_isInstanceTemplate",
          "summary": "Check if instance is template",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Instance is template"
            },
            "400": {
              "description": "Something went wrong"
            },
            "404": {
              "description": "Instance is not template"
            }
          },
          "tags": [
            "Instances"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "InstanceController_markAsTemplate",
          "summary": "Mark instance as template",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "icon": {
                      "type": "string"
                    },
                    "isTemplate": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Instance marked as template"
            },
            "400": {
              "description": "Something went wrong"
            },
            "403": {
              "description": "Invalid token"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/instances/job/{id}": {
        "get": {
          "operationId": "InstanceController_getJob",
          "summary": "Get job by id",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Job found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances": {
        "post": {
          "operationId": "InstanceController_createInstance",
          "summary": "Create instance from template",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "token": {
                      "type": "string"
                    },
                    "templateId": {
                      "type": "string"
                    },
                    "fromTemplate": {
                      "type": "boolean"
                    },
                    "enableSSO": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Instance created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "id": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Something went wrong"
            },
            "403": {
              "description": "Invalid token"
            },
            "409": {
              "description": "Instance name is taken"
            }
          },
          "tags": [
            "Instances"
          ]
        },
        "get": {
          "operationId": "InstanceController_index",
          "summary": "List instances with optional search",
          "parameters": [
            {
              "name": "search",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "page_size",
              "required": false,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Paginated list of instances"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/validate_token/{token}": {
        "get": {
          "operationId": "InstanceController_validateToken",
          "summary": "Validate token",
          "parameters": [
            {
              "name": "token",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Token is valid",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "email": {
                            "type": "string"
                          },
                          "generatedAt": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Token is required"
            },
            "404": {
              "description": "Token is not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/{id}/add-user": {
        "get": {
          "operationId": "InstanceController_getInstances",
          "summary": "Add user to instance",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User added to instance"
            },
            "400": {
              "description": "Something went wrong"
            },
            "403": {
              "description": "Invalid token"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/instances/templates": {
        "get": {
          "operationId": "InstanceController_getTemplates",
          "summary": "Get templates",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Templates",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "name": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "icon": {
                          "type": "string"
                        },
                        "isTemplate": {
                          "type": "boolean"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Something went wrong"
            },
            "403": {
              "description": "Invalid token"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/reminder": {
        "post": {
          "operationId": "InstanceController_reminder",
          "summary": "Send reminder",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "host": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Reminder sent"
            },
            "400": {
              "description": "Something went wrong"
            },
            "403": {
              "description": "Invalid token"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/list-databases": {
        "get": {
          "operationId": "InstanceController_listDatabases",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/{id}/deactivate": {
        "put": {
          "operationId": "InstanceController_deactivate",
          "summary": "Deactivate an instance by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Instance ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Instance deactivated"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/{id}/activate": {
        "put": {
          "operationId": "InstanceController_activate",
          "summary": "Activate an instance by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Instance ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Instance activated"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/copy": {
        "post": {
          "operationId": "InstanceController_copyInstance",
          "summary": "Copy an instance from DB dump",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CopyInstanceDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Instance copied"
            },
            "403": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/invite/{email}": {
        "get": {
          "operationId": "InstanceController_sendInvitation",
          "summary": "Send instance creation invitation to email",
          "parameters": [
            {
              "name": "email",
              "required": true,
              "in": "path",
              "description": "Target email address",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Invitation sent successfully"
            },
            "400": {
              "description": "Invalid email or token error"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/{id}": {
        "delete": {
          "operationId": "InstanceController_delete",
          "summary": "Delete an instance by ID",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "description": "Instance ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Instance deleted successfully"
            },
            "404": {
              "description": "Instance not found"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/instances/last-backup": {
        "get": {
          "operationId": "InstanceController_getLastBackup",
          "summary": "Get the latest backup from S3",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns latest backup file metadata"
            },
            "403": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Instances"
          ]
        }
      },
      "/v2/filters": {
        "get": {
          "operationId": "FilterController_getFilters",
          "summary": "Get all filters for user",
          "parameters": [
            {
              "name": "name",
              "in": "query",
              "description": "Filter name",
              "required": false
            },
            {
              "name": "type",
              "in": "query",
              "description": "Filter type",
              "required": false
            },
            {
              "name": "userId",
              "in": "query",
              "description": "User id",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "user": {
                          "type": "string"
                        },
                        "filters": {
                          "type": "object"
                        },
                        "type": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Filters"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "FilterController_createFilter",
          "summary": "Create filter",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "userId": {
                      "type": "string"
                    },
                    "filters": {
                      "type": "object"
                    },
                    "type": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Filters"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/filters/{id}": {
        "delete": {
          "operationId": "FilterController_deleteFilter",
          "summary": "Delete filter",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Filter id",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Filters"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "patch": {
          "operationId": "FilterController_renameFilter",
          "summary": "Rename filter",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Filter id",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Filters"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "FilterController_updateFilter",
          "summary": "Update filter",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Filter id",
              "required": true
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "filter": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad Request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Filters"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/question": {
        "get": {
          "operationId": "QuestionController_getQuestions",
          "summary": "Get questions",
          "parameters": [
            {
              "name": "only_global",
              "in": "query",
              "description": "Only global questions",
              "required": false
            },
            {
              "name": "jobType",
              "in": "query",
              "description": "Job type",
              "required": false
            },
            {
              "name": "ids",
              "in": "query",
              "description": "Question ids",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Questions",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "_id": {
                          "type": "string"
                        },
                        "ID": {
                          "type": "number"
                        },
                        "title": {
                          "type": "string"
                        },
                        "description": {
                          "type": "string"
                        },
                        "type": {
                          "type": "number"
                        },
                        "jobType": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            },
                            "ID": {
                              "type": "number"
                            },
                            "title": {
                              "type": "string"
                            }
                          }
                        },
                        "root": {
                          "type": "string"
                        },
                        "isGlobal": {
                          "type": "boolean"
                        },
                        "createdAt": {
                          "type": "string"
                        },
                        "updatedAt": {
                          "type": "string"
                        },
                        "disabled": {
                          "type": "boolean"
                        },
                        "sequence": {
                          "type": "number"
                        },
                        "settings": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Something went wrong",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Questions"
          ]
        },
        "post": {
          "operationId": "QuestionController_create",
          "summary": "Create question",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string",
                      "description": "Description of the question"
                    },
                    "is_global": {
                      "type": "boolean",
                      "description": "Flag if the question global"
                    },
                    "jobType": {
                      "type": "string",
                      "description": "Internal Job Type ID that the questions should be attached to"
                    },
                    "settings": {
                      "type": "object",
                      "description": "Settings of the question"
                    },
                    "type": {
                      "type": "number",
                      "description": "Type of the question"
                    },
                    "title": {
                      "type": "string",
                      "description": "Title of the question"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Questions"
          ]
        }
      },
      "/v2/question/projects": {
        "get": {
          "operationId": "QuestionController_listProjects",
          "summary": "List question projects",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Question projects response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array"
                  }
                }
              }
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Questions"
          ]
        }
      },
      "/v2/question/{id}": {
        "put": {
          "operationId": "QuestionController_update",
          "summary": "Update question",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "description": {
                      "type": "string",
                      "description": "Description of the question"
                    },
                    "disabled": {
                      "type": "boolean",
                      "description": "Disabled state"
                    },
                    "isClientVisible": {
                      "type": "boolean",
                      "description": "Client visiblity state"
                    },
                    "is_global": {
                      "type": "boolean",
                      "description": "Flag if the question is global"
                    },
                    "job_type": {
                      "type": "string",
                      "description": "Internal ID of the Job Type that the question is attached to"
                    },
                    "root": {
                      "type": "string",
                      "description": "Root question ID"
                    },
                    "sequence": {
                      "type": "number",
                      "description": "Sequence number"
                    },
                    "settings": {
                      "type": "object",
                      "description": "Settings of the question"
                    },
                    "title": {
                      "type": "string",
                      "description": "Title of the question"
                    },
                    "type": {
                      "type": "number",
                      "description": "Type of the question"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Update question result",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      },
                      "data": {
                        "type": "object",
                        "description": "Information about the update question",
                        "properties": {
                          "id": {
                            "type": "number",
                            "description": "ID of the updated question"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Job type or the Question not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Questions"
          ]
        },
        "delete": {
          "operationId": "QuestionController_delete",
          "summary": "Delete question",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Delete response",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "description": "Status of the operation"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Question not found"
            },
            "500": {
              "description": "Something went wrong"
            }
          },
          "tags": [
            "Questions"
          ]
        }
      },
      "/v2/question/{id}/answers": {
        "get": {
          "operationId": "QuestionController_getAnswers",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Questions"
          ]
        }
      },
      "/v2/settings": {
        "get": {
          "operationId": "SettingsController_view",
          "summary": "Get settings",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns settings",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "host": {
                        "type": "string"
                      },
                      "sys_admins": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "settings": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "SettingsController_update",
          "summary": "Update settings",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "logo": {
                      "type": "string"
                    },
                    "secondaryLogoUrl": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "timezone": {
                      "type": "string"
                    },
                    "language": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/connect_drive": {
        "get": {
          "operationId": "SettingsController_connectDrive",
          "summary": "Generate Google Drive auth url",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/disconnect_drive": {
        "get": {
          "operationId": "SettingsController_disconnectDrive",
          "summary": "Disconnect Google Drive",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/is_connect_drive": {
        "get": {
          "operationId": "SettingsController_isConnectDrive",
          "summary": "Check if Google Drive is connected",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "code": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/projectFields": {
        "put": {
          "operationId": "SettingsController_updateProjectFields",
          "summary": "Update project fields",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/blueprints": {
        "put": {
          "operationId": "SettingsController_updateBlueprints",
          "summary": "Update blueprints",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns success",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/v2/settings/manifest": {
        "get": {
          "operationId": "SettingsController_manifest",
          "summary": "Get manifest",
          "parameters": [],
          "responses": {
            "200": {
              "description": "Returns manifest",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "short_name": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "icons": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "src": {
                              "type": "string"
                            },
                            "type": {
                              "type": "string"
                            }
                          }
                        }
                      },
                      "start_url": {
                        "type": "string"
                      },
                      "display": {
                        "type": "string"
                      },
                      "orientation": {
                        "type": "string"
                      },
                      "theme_color": {
                        "type": "string"
                      },
                      "background_color": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error"
            }
          },
          "tags": [
            "Settings"
          ]
        }
      },
      "/v2/answers": {
        "post": {
          "operationId": "AnswersController_update",
          "summary": "Update answers",
          "description": "Update answers for a job",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "job": {
                      "type": "string"
                    },
                    "location": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "question": {
                            "type": "string"
                          },
                          "answer": {
                            "type": "object"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "parameters": [],
          "responses": {
            "200": {
              "description": "Answers updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean"
                      },
                      "result": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "question": {
                              "type": "string"
                            },
                            "answer": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Bad request",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            },
            "500": {
              "description": "Internal server error",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Answers"
          ]
        }
      },
      "/v2/answers/users": {
        "get": {
          "operationId": "AnswersController_listUsers",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Answers"
          ]
        }
      },
      "/v2/skills": {
        "get": {
          "operationId": "SkillController_index",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        },
        "post": {
          "operationId": "SkillController_create",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/{id}": {
        "patch": {
          "operationId": "SkillController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        },
        "delete": {
          "operationId": "SkillController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        },
        "get": {
          "operationId": "SkillController_view",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/user/{userId}": {
        "post": {
          "operationId": "SkillController_addToUser",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/job/{jobId}": {
        "post": {
          "operationId": "SkillController_addToJob",
          "parameters": [
            {
              "name": "jobId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        },
        "delete": {
          "operationId": "SkillController_removeFromJob",
          "parameters": [
            {
              "name": "jobId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/jobType/{jobTypeId}": {
        "post": {
          "operationId": "SkillController_addToJobType",
          "parameters": [
            {
              "name": "jobTypeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        },
        "delete": {
          "operationId": "SkillController_removeFromJobType",
          "parameters": [
            {
              "name": "jobTypeId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/user/{userId}/{skillId}": {
        "delete": {
          "operationId": "SkillController_removeFromUser",
          "parameters": [
            {
              "name": "userId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/skills/{skill_id}/expiration/{user_id}": {
        "post": {
          "operationId": "SkillController_updateExpiration",
          "parameters": [
            {
              "name": "user_id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "skill_id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Skills"
          ]
        }
      },
      "/v2/ping": {
        "get": {
          "operationId": "ServerController_ping",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/v2/widgets/dashboard": {
        "get": {
          "operationId": "WidgetController_index",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "post": {
          "operationId": "WidgetController_create",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          }
        }
      },
      "/v2/widgets/dashboard/{id}": {
        "get": {
          "operationId": "WidgetController_view",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "put": {
          "operationId": "WidgetController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        },
        "delete": {
          "operationId": "WidgetController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
