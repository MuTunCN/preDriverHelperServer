package cn.mutun.prodriverhelper_exam;


import tk.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"cn.mutun.prodriverhelper_exam.Dao"})
public class ProdriverhelperExamApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProdriverhelperExamApplication.class, args);
    }

}
