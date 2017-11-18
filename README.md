[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

用這一個專案改的
https://github.com/asdofe/node-react-webpack-sample


打算用Node當後端React當前端搞一個火車時刻表的webApp
我先寫後端...

---

## RDB Schema

基本上用SequelizeJS這個ORM框架做和資料庫串聯的動作，所以資料表盡量簡潔。

* train_time_table

|field|type|
|---|---|
|train_id:車次編號|INTEGER|
|arrive_t:到達時間|DATE|
|depart_t:離開時間|DATE|
|order:順序|INTEGER|
|route:保留欄位，目前沒用|STRING|
|source_hash:hash確認來自哪個檔案|STRING|
