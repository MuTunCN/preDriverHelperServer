package cn.mutun.prodriverhelper_exam.Entity;
import tk.mybatis.mapper.common.Mapper;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
@Table(
    name = "questions"
)
public class Question  {
    @Column(name = "id")
    @Id
    private int id;
    @Column(name = "a")
    private String a;
    @Column(name = "b")
    private String b;
    @Column(name = "c")
    private String c;
    @Column(name = "d")
    private String d;
    @Column(name = "explainText")
    private String explainText;
    @Column(name = "file")
    private String file;
    @Column(name = "qId")
    private String qId;
    @Column(name = "tikuType")
    private String tikuType;
    @Column(name = "title")
    private String title;
    @Column(name = "val")
    private String val;
    @Column (name = "type")
    private int type;
    public Question() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getA() {
        return a;
    }

    public void setA(String a) {
        this.a = a;
    }

    public String getB() {
        return b;
    }

    public void setB(String b) {
        this.b = b;
    }

    public String getC() {
        return c;
    }

    public void setC(String c) {
        this.c = c;
    }

    public String getD() {
        return d;
    }

    public void setD(String d) {
        this.d = d;
    }

    public String getExplainText() {
        return explainText;
    }

    public void setExplainText(String explainText) {
        this.explainText = explainText;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public String getqId() {
        return qId;
    }

    public void setqId(String qId) {
        this.qId = qId;
    }

    public String getTikuType() {
        return tikuType;
    }

    public void setTikuType(String tikuType) {
        this.tikuType = tikuType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVal() {
        return val;
    }

    public void setVal(String val) {
        this.val = val;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}

