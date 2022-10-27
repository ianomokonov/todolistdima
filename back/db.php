<?php
//класс базы данных
class DataBase
{
    private $dbname = "todo";
    private $login = "root";
    private $password = "";
    public $db;
    public function __construct()
    {
        $this->db = new PDO("mysql:host=localhost;dbname=" . $this->dbname . ";charset=UTF8", $this->login, $this->password);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    
}