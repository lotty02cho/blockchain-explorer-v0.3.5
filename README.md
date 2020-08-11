# Hyperledger Explorer

## Hyperledger Explorer 기본 환경설정

### Hyperledger Explorer 프로젝트 복제

```linux-config
cd /opt/gopath/src/github.com/hyperledger
git clone http://220.230.113.60:9010/honeybee/blockchain-explorer-v0.3.5
```

### PostgreSQL 설치

```linux-config
cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer

# PostgreSQL 설치
#PostgreSQL 버전: 9.5+173ubuntu0.1
sudo apt-get install postgresql
postgres -version
```

### 데이터베이스 설정

```linux-config
# 데이터베이스 생성 스크립트 실행
cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer/app/persistence/fabric/postgreSQL/db
./createdb.sh

# PostgreSQL 접속
sudo -u postgres psql

# 데이터베이스 확인
\l

# 테이블 확인
\d

# PostgreSQL 접속 종료
\q
```

### Hyperledger Explorer 빌드

node 버전은 8.x를 사용합니다.

```linux-config
# Hyperledger Explorer 빌드
cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer
npm install

cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer/app/test
npm install
#npm run test

cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer/client/
npm install
#npm test -- -u --coverage
npm run build
```


## Hyperledger Explorer 실행 및 종료

### Hyperledger Explorer 실행

```linux-config
# Hyperledger Explorer 실행
cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer
./start.sh
```

### Hyperledger Explorer 실행

```linux-config
# Hyperledger Explorer 종료
cd /opt/gopath/src/github.com/hyperledger/blockchain-explorer
./stop.sh
```