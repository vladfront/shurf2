    header('Content-type: text/html; charset=utf-8');
    error_reporting(0);   
 
if(!empty($_POST['send'])) {
    $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 300);
    $phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 100);
    $sity = substr(htmlspecialchars(trim($_POST['sity'])), 0, 100);
    $message = substr(htmlspecialchars(trim($_POST['message'])), 0, 3000);  
    $ip = $_SERVER['REMOTE_ADDR'];
 
    $Nzakaz = rand(10000, 99999);
 
    $mess  = "ПІБ: <b>".$name."</b><br>";
    $mess .= "Телефон: <b>".$phone."</b><br>";
    $mess .= "Місто: <b>".$sity."</b><br>";
    $mess .= "Повідомлення: <b>".$message."</b><br>";  
    $theme = "Заявка Z".$Nzakaz;
 
    mail("secretgwp@gmail.com", $theme, $mess, "From: mysite.com <secretgwp@gmail.com>\nContent-Type: text/html;\n charset=utf-8\nX-Priority: 0");
     
    echo "<h3>Заявка успішно оформлена.</h3>";
    echo "<p>Заявці надано номер Z".$Nzakaz.". Наш менеджер зв'яжеться з вами найближчим часом.</p>";        
    }
else {  
    echo "<h2>Помилка! Спробуйте ще раз.</h2>";    
}
</secretgwp@gmail.com>