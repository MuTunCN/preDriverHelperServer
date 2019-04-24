package cn.mutun.prodriverhelper_exam.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

@Table(
        name = "userinfo"
)
public class UserInfoDO {
    @Id
    Integer id;
    String nikename;
    Integer gender;
    String avatar_url;
    Integer all_time;
    Integer all_count;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNikename() {
        return nikename;
    }

    public void setNikename(String nikename) {
        this.nikename = nikename;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getAvatar_url() {
        return avatar_url;
    }

    public void setAvatar_url(String avatar_url) {
        this.avatar_url = avatar_url;
    }

    public Integer getAll_time() {
        return all_time;
    }

    public void setAll_time(Integer all_time) {
        this.all_time = all_time;
    }

    public Integer getAll_count() {
        return all_count;
    }

    public void setAll_count(Integer all_count) {
        this.all_count = all_count;
    }
}
