<?php
require_once __DIR__ . '/UserRepository.php';

class UserController {

    private $Repo;

    public function __construct(){
        $this->Repo = new UserRepository();
    }
     public function index(){
        echo json_encode($this->Repo->getAll()); // json_encode transform array em JSON
     }
    public function store(){
        $data = json_decode(file_get_contents("php://input"), true);
        if(!$data['name']|| !$data['email']){
            http_response_code(400);
        echo json_encode(["message" => "Invalid input"]);
        return;
        }

        $this->Repo->create($data['name'], $data['email'], $data['password']);
        http_response_code(201);
        echo json_encode(["message" => "User created successfully"]);
    }
       
    public function update() {
        $data = json_decode(file_get_contents("php://input"), true);
        if(!$data['id'] || !$data['name'] || !$data['email'] || !$data['password']){
            http_response_code(400);
            echo json_encode(["message" => "Invalid input"]);
            return;
        }   
        $this->Repo->update(
            $data['id'],
            $data['name'],
            $data['email'],
            $data['password']
        );
    }
    public function destroy() {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "User ID required"]);
        return;
    }

    $this->Repo->delete($data['id']);
    echo json_encode(["message" => "User deleted successfully"]);
    }
}