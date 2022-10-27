<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

require_once 'db.php';
$database = new DataBase();

if (isset($_GET['key'])) {
    switch ($_GET['key']) {
        case 'get-list':
            $query = $database->db->query("SELECT * FROM ToDo");
            echo json_encode($query->fetchAll());
            return;

        case 'set-is-done':
            $data = json_decode(file_get_contents("php://input"), true);
            $query = $database->db->prepare("UPDATE ToDo SET isDone=? WHERE id=?");
            $query->execute(array($data['isDone'], $data['id']));
            echo json_encode(true);
            return;

        case 'add-deal':
            $data = json_decode(file_get_contents("php://input"), true);
            $query = $database->db->prepare("INSERT INTO ToDo (title) VALUES (?)");
            $query->execute(array($data['title']));
            echo json_encode($database->db->lastInsertId());
            return;

        case 'delete-deal':
            $data = json_decode(file_get_contents("php://input"), true);
            $query = $database->db->prepare("DELETE FROM ToDo WHERE id=?");
            $query->execute(array($data['id']));
            echo json_encode(true);
            return;
        
        default:
            echo json_encode(array("message" => "Ключ запроса не найден"));
            return;
    }
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Отсутствует ключ запроса."));
}
?>