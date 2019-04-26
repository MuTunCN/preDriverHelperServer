package cn.mutun.prodriverhelper_exam;


import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import tk.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"cn.mutun.prodriverhelper_exam.Dao"})
@ServletComponentScan
public class ProdriverhelperExamApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProdriverhelperExamApplication.class, args);
    }
}
