package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                        // declaring the db globally
var err error
type Leaderboard struct {
  ID uint `json:"id"`
  Name string `json:"name"`
  Score uint `json:"score"`
  Gid uint `json:"gid"`
  Quizname string `json:"quizname"`
}
type Question struct {
  ID uint `json:"id"`
  Qid uint `json:qid`
  Question string `json:"question"`
  FirstOpt string `json:"firstopt"`
  SecOpt string `json:"secopt"`
  ThirdOpt string `json:"thirdopt"`
  FouthOpt string `json:"fourthopt"`
  Answer string `json:"answer"`
}
type Person struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   City string `json:"city"`
}
type User struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   Password string `json:"password"`
}
type Quiz struct {
  ID uint `json:"id"`
  FirstName string `json:"firstname"`
  Gid string `json:"gid"`
}
type Genre struct {
  ID uint `json:"id"`
  FirstName string `json:"firstname"`
}
func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&User{})
   db.AutoMigrate(&Quiz{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Leaderboard{})
   db.AutoMigrate(&Genre{})
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.POST("/people", CreatePerson)
   r.PUT("/people/:id", UpdatePerson)
   r.DELETE("/people/:id", DeletePerson)
   r.POST("/register/",Register)
   r.POST("/login/",Authenticate)
   r.POST("/makequizzes/",Makequiz)
   r.POST("/makegenre/",Makegenre)
   r.GET("/viewquizzes/",Getquizzes)
   r.GET("/viewgenre/",Getgenre)
   r.DELETE("/viewquizzes/:id",Deletequiz)
   r.POST("/makequestions/",Makequestion)
   r.GET("/viewquestions/",ViewQuestions)
   r.PUT("/viewquestions/:id",UpdateQuestion)
   r.DELETE("/viewquestions/:id",DeleteQuestion)
   r.GET("/viewquizzes/:id",Getquiz)
   r.POST("/leaderboard/",PostQuizdata)
   r.GET("/leaderboard/",Getleaderboard)
   r.GET("/leaderboard/:id",Leaderboadbygenre)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}
func Leaderboadbygenre(c *gin.Context) {
  id := c.Params.ByName("id")
  var leaderboardbygenre []Leaderboard
  if err := db.Where("gid = ?", id).Order("score desc").Find(&leaderboardbygenre).Error; err != nil {
    c.AbortWithStatus(404)
    fmt.Println(err)
  }else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, leaderboardbygenre)
  }
}
func Getgenre(c *gin.Context) {
  var genre []Genre
  if err := db.Find(&genre).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, genre)
  }
}
func Makegenre(c *gin.Context) {
  var genre Genre
  c.BindJSON(&genre)
  db.Create(&genre)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, genre)
}
func Getleaderboard(c *gin.Context) {
  var leaderboard []Leaderboard
  if err := db.Order("score desc").Find(&leaderboard).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, leaderboard)
  }
}
func PostQuizdata(c *gin.Context) {
  var leaderboard Leaderboard
  c.BindJSON(&leaderboard)
  db.Create(&leaderboard)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, leaderboard)
}
func UpdateQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  if err := db.Where("id = ?", id).First(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  }
  c.BindJSON(&question)
  db.Save(&question)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, question)
}
func Deletequiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var quiz Quiz
  var question Question
  d := db.Where("id = ?", id).Delete(&quiz)
  b := db.Where("qid = ?", id).Delete(&question)
  fmt.Println(d)
  fmt.Println(b)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  var question Question
  d := db.Where("id = ?", id).Delete(&question)
  fmt.Println(d)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func Getquiz(c *gin.Context) {
  id := c.Params.ByName("id")
  var question []Question
  if err := db.Where("qid = ?", id).Find(&question).Error; err != nil {
    c.AbortWithStatus(404)
    fmt.Println(err)
  }else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, question)
  }
}
func ViewQuestions(c *gin.Context) {
  var question []Question
  if err := db.Find(&question).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, question)
  }
}
func Makequestion(c *gin.Context) {
  var question Question
  c.BindJSON(&question)
  db.Create(&question)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, question)
}
func Getquizzes(c *gin.Context) {
  var quiz []Quiz
  if err := db.Find(&quiz).Error; err != nil {
     c.AbortWithStatus(404)
     fmt.Println(err)
  } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, quiz)
  }
}
func Makequiz(c *gin.Context) {
  var quiz Quiz
  c.BindJSON(&quiz)
  db.Create(&quiz)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, quiz)
}
func Register(c *gin.Context) {
  var person User
  c.BindJSON(&person)
  db.Create(&person)
  c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
  c.JSON(200, person)
}
func Authenticate(c *gin.Context){
  isauth := false
  var person User
  var person_1 []User
  c.BindJSON(&person)
  db.Where("first_name = ? And last_name = ? And password = ?",person.FirstName,person.LastName,person.Password).Find(&person_1)
  if len(person_1) != 0 {
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200,isauth)
  }else{
    isauth = true
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(401,isauth)
  }
}
func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person User
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []User
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}
