module.exports = {
  dev: {
    address: 'http://127.0.0.1:3000',
    port: 3000,
    api: {
      success: 200,
      error: 404,
      codeError: 500,
    },
    mysql: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'mall',
    },
    redis: {
      host: 'localhost',
      port: '6379',
      timeout: 120,
    },
    alicloud: {
      AccessKeyId: `LTAI5t8qzoUW19tVHfhJiog1`,
      AccessKeySecret: `IqQif939OKN1TfqfnJkEfy8g0xRWYK`,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    },
    alipaySdk: {
      appId: '2021000118634790', // 开放平台上创建应用时生成的 appId
      gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改
      signType: 'RSA2', // 签名算法,默认 RSA2
      privateKey: `MIIEowIBAAKCAQEAmRqRkw81h+RdkpVbT3VzVWtuqvVTNDupWCGkYgFwV5Y09ES4yY5UfHrfXXewwzWa3k9APxQjBzo3OpH9Mg2oxPlaqTt+ZBDZqOG+zA3BTRfMlA8UEBAdiFNvysZ2DvkEoKq3yRRaZQ3NiAJmU8DVNJSIu2IqrrPhSCneE6txXDH1ZmYkvQ4z//Vx2PrdSGVWHhN5ClsbUJiRUTTzhGnHNq0aI74BuDTW5KhT60eYpwWHpXpNvN4bEx2HW+A3+hTLte3JNTbgZV9u2CAB+7bymqPvMuaHU4zTfSmpkX0EwoAwSIivZLDRbbS8L2C+rdbgzZ3My6KGn5IXzN3AFSnBjwIDAQABAoIBAB0lTaktMAealaWeAS/zL+2G8h5hbWF4Khi47s4pb/V8hsAphPP5wGOiEHt+mYvP3JeNhrF7Z9+sWW8w835f000MGxI0XS83dfgMYYH+7Fl8ullFNZCJQNX+7D0x4q+fAB6F4U7KLRsnsYS+0DQJdYz46b6iRXXUkIJoVfpwnLfsDm/Nr5xS+rgny+yIimsuN6/4eaNL7fomNjmjX8WHKbzFN69k2M/7pLs5KFXelxXADcUYeTJtoZAjKXYtgOGZKK4PbrFiLhUfbzhlouF56aZfoJVJD46kgSrGOrD+LB5+v42ZcZgaaWhQekCNBC6KVKQEeiApqbQfMi8uH0FLXAECgYEA6Er6OZJoTm0eGtBynXInGR/tyUEinMJgbOWN3ox194dVsbAOX5/UqX3WexuPTdqZiVjw3rAXikW7mzuvIU0h6hNo/rX/A3XeblxHSfMidk1VcucRHS9CvP/OasBIzraWtIt75xDtoUrplKSBz0zjzmFpDAD/tpq+n5rWkTNZuQ8CgYEAqLqmSa3BP4xjMtSRTKWO3Ja54sLJVc1qSLOvGLnCamcNcl7o1kePmoGJyrbKVGUFkgPaJq4VCDBaa6WWzVEP493wyibig2c5V1NIW/Xun+rzkKH7PC80V1iEFwaJYoTV6Cfk/c9fBbpaKbzJ/YFRj2DwQaPmUvpiPLj1E3rqb4ECgYEA2B6Z++J5ZS4kajIx0MaaFcgdBbeyKkK2T9qrSblJMAkb83ung9RCmYbYfCVCCN8vJhg30hfnbuA+EclPwR3wRcXVU9Wj82ZAklEMioLJN2Pv8j2FMK/92bXuKGfJ1XkPcd6sYmjfjccS1xbPJz2UXTlH8MElKJGEdR4sL1+lRIUCgYBvkZP5LiqVYbgKWWKGgwa3N/dMSS6mTMDVt/K078ftYZ0TnkxpvEHpkXRSlZGuQmpvhZqPbxa7JnXzrjfMJajTLONWWGX5K51P7+Lt4+3Y0pwha+pbfn8mroIRU6IugdWLwC174s5bVEDgTlRmC0ep/hh/3ueiwKuKqWZsbh9sgQKBgFw1BG2wUyiIPJE0lkonHGLGcrYqvOhU+/Da5a9vGZlOkeXALEzoqMBhIIDU+bORRupeNmjUHyjKvHFlMYWiPEQe9EiE14xaFA7nV/kn/z4GUgRhigoueRW/dbEXZY0ht+DzQX0DN0IYxCw92tr/REz1V2otqMujD/Z81/PRf6XC`,
      publicKey: `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjKdVNWUw2w2+gRZA6Y295yy/m7T+JLgoWIAS0/V+28Xi1raEm/u4URpffNdVnfs4OHwJxnBO5hm4RvB6GC6d/oHKcHUdj9enoPW/z4mi4hK0CseydRIst0mdwgvzxp5waB6deLBOm24Lj/H8cTlBvws7gysWnlaqJa3Ih+nfTjGFn6FI7v7gTuOfumDbupNzeuxp3FF2KufDBM+R4amuMT/SCkx5tZ+77bkhuyyfDo7aq9nzoDY1gSNlOS9GGXme2UrierL/OT5KSX4eqlVYYUuR6NYS+MPJI/t8HkxXtFqioRsXfPbWxlsWSCNUKd7lT0C9niiFxzLC49xr78/7wIDAQAB`,
    },

    sql: {
      category: {
        public: {
          nav: `SELECT title,zone,images FROM products_category WHERE products_type=1 ORDER BY zone`,
          searchList: `SELECT id,name,thumbnail from products_all where name like ?`,
          searchRecommend: `SELECT id,name from products_all where mark_self = 3 LIMIT 0,8`,
          likeList: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag from products_all where mark_self = 2 order by rand() LIMIT 20`,
        },
        home: {
          specialArea: `SELECT id,title,subtitle,images,zone FROM products_category WHERE products_type=2`,
          tabsAllItem: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag from products_all ORDER BY sorting_id desc LIMIT ?,?`,
          tabsDinnerItem: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag from products_all where type_tag not like '%烘焙材料%' AND  category_id BETWEEN 1 AND 6 ORDER BY sorting_id LIMIT ?,?`,
          tabsQualityItem: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag from products_all WHERE mark_self = 3 ORDER BY sorting_id  LIMIT ?,?`,
          tabspopularItem: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag FROM products_all WHERE total_sales > 7500 ORDER BY sorting_id desc  LIMIT ?,?`,
        },
        category: {
          categoryList: `select category_id,type_tag,thumbnail,mark_self from products_all where id in (select Max(id) from products_all group by type_tag)`,
          categoryListItem: `SELECT id,name,origin_price,price,vip_price,spec,thumbnail,total_sales,stock_number,type,type_tag,mark_new FROM products_all WHERE type_tag like ? ORDER BY sorting_id`,
        },
      },
      order: {
        orderCreate: `INSERT INTO orders(uid,cid,aid,create_time,number,status) VALUES(?,?,?,?,?,0)`,
        // catOrders: `SELECT number,create_time as time FROM orders WHERE cid = ? AND number = ?`,
        checkOrderStatus: `SELECT status FROM orders WHERE number = ?`,
        closeStatus: `UPDATE orders SET status = 3 WHERE number = ?`,
        orderAddress: `SELECT id,u_id,name,tel,province,city,county,address,addressDetail,areaCode,isDefault FROM user_address WHERE u_id = ? AND isDefault = 1`,
        orderProduct: `SELECT a.name as name,a.price,a.spec,a.thumbnail,a.type_tag as tag,
        b.c_quantity as quantity,b.id as cid
        FROM products_all as a,user_cart as b 
        WHERE b.id = ? AND b.u_id = ? AND a.id = b.p_id`,
        payOrderInfo: `SELECT a.number,b.c_quantity as quantity,c.price,d.u_truename as name,d.u_name as tel
        FROM orders as a,user_cart as b,products_all as c,user_info as d
        WHERE number = ?  AND a.cid = b.id AND b.p_id = c.id AND a.uid = d.id`,
        orderAll: `SELECT a.id as oid,a.number,a.create_time as time,a.status, 
        b.c_quantity as quantity,
        c.name as name,c.price,c.spec,c.thumbnail,c.type_tag as tag
        FROM orders as a,user_cart as b,products_all as c
        WHERE a.uid = ? AND a.cid = b.id AND b.p_id = c.id`,
        orderStatus: `SELECT a.id as oid,a.number,a.create_time as time,a.status, 
        b.c_quantity as quantity,
        c.name as name,c.price,c.spec,c.thumbnail,c.type_tag as tag
        FROM orders as a,user_cart as b,products_all as c
        WHERE a.uid = ? AND a.status = ? AND a.cid = b.id AND b.p_id = c.id `,
        delOrder: `DELETE FROM  orders WHERE id = ? AND uid = ?`,
      },
      pay: {
        checkPwd: `SELECT u_money from user_info WHERE id = ? AND pay_pwd = ?`,
        checkMoney: ` SELECT u_money from user_info WHERE id = ? AND u_money > ? AND pay_pwd = ?`,
        updateMoney: `UPDATE user_info set u_money =u_money-? WHERE id = ? AND pay_pwd = ?`,

        checkGoods: `SELECT c.stock_number as stock FROM orders as a,user_cart as b,products_all as c 
        WHERE number = ? AND a.cid = b.id AND b.p_id = c.id AND c.stock_number >= b.c_quantity`,

        update: `UPDATE orders as a,user_cart as b,products_all as c
        SET a.place_time=?,a.status=1,
        b.is_del = 1,
        c.stock_number = c.stock_number - b.c_quantity
        WHERE a.number = ? AND a.cid = b.id AND c.id = b.p_id`,
      },
      shop: {
        // info: `SELECT * FROM shop_goods WHERE id = ?`,
        // home: `SELECT * FROM shop_goods ORDER BY id DESC LIMIT ?,?`,
        // category: 'SELECT * FROM `shop_goods` WHERE g_brand=?',
      },
      user: {
        isRegister: `SELECT id,u_name,u_pwd,u_icons,u_money,u_truename,u_nicname FROM user_info WHERE u_name=?`,
        register: `INSERT INTO user_info (u_name,u_pwd,pay_pwd,u_money) VALUES(?,?,123456,99999)`,
      },
      cart: {
        allGoods: `SELECT A.id as pid,A.name,A.origin_price,A.price,A.vip_price,A.spec,A.thumbnail,A.total_sales,A.stock_number,A.type_tag,
        B.c_quantity as quantity,B.id as id FROM products_all A,user_cart B 
        WHERE A.id = B.p_id AND B.u_id = ? AND B.is_del = 0 ORDER BY id`,
        addGoods: `INSERT INTO user_cart(c_quantity,u_id,p_id,is_del) VALUES(?,?,?,0)`,
        checkGoods: `SELECT * FROM user_cart WHERE u_id=? AND p_id = ? AND is_del = 0`,
        delGoods: `UPDATE user_cart SET is_del = 1 WHERE u_id = ? AND p_id = ? AND is_del = 0`,
        updateGoods: `UPDATE user_cart SET c_quantity=c_quantity+? WHERE u_id=? AND p_id=? AND is_del = 0`,
        increment: `UPDATE user_cart SET c_quantity=c_quantity+? WHERE u_id=? AND p_id=? AND is_del = 0`,
        decrement: `UPDATE user_cart SET c_quantity=c_quantity-? WHERE u_id=? AND p_id=? AND is_del = 0`,
      },
      address: {
        all: `SELECT * FROM user_address WHERE u_id=?`,
        add: `INSERT INTO user_address(u_id,name,tel,province,city,county,address,isDefault,addressDetail,areaCode) VALUES(?,?,?,?,?,?,?,?,?,?)`,
        edit: `UPDATE user_address SET name = ?,tel=?,province=?,city=?,county=?,address=?,isDefault=?,addressDetail=?,areaCode=? WHERE id = ?`,
        resetDefault: `UPDATE user_address SET isDefault = 0 WHERE u_id = ?`,
        del: `DELETE FROM user_address WHERE u_id=? AND id=?`,
      },
    },
    jwt: {
      secret: 'abc',
      timeout: 3600 * 24, // 初始化一小时
    },
  },
}
