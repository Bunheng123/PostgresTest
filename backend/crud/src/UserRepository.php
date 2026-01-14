<?php  
require_once 'Database.php';
class UserRepository {
    public function getAll() {
        return Database::getConnect()
        ->query("SELECT * FROM users")
        ->fetchAll();
    }
    public function create($name, $email, $password){
        $stmt = Database::getConnect()
            ->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $password]);
    }
    public function update($id, $name, $email, $password) {
        $stmt = Database::getConnect()
            ->prepare("UPDATE users SET name=?, email=?, password=? WHERE id=?");
        $stmt->execute([$name, $email, $password, $id]);
    }
    public function delete($id) {
    $stmt = Database::getConnect()
        ->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
    }
}