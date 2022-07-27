import base64
import time
from pathlib import Path, PurePath

import uvicorn
from fastapi import FastAPI, Depends
from typing import List, Dict
from pydantic import BaseModel

img = Path("./imgs")
app = FastAPI(
    title="后台测试用例",
    contact={
        "name": "Zhao Hao",
        "email": "601095001@qq.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)


class Code(BaseModel):
    id: int
    code: str


class RequestModel(BaseModel):
    max_lookback_years: str
    max_position_size: str
    min_position_size: str
    data_source: int
    CodeList: List[Code]


class Weight(BaseModel):
    AMD: float
    AMZN: float
    ZM: float


class Img(BaseModel):
    weight: str
    AMZN: str
    ZM: str
    AMD: str


class ResposeModel(BaseModel):
    weight: Weight
    weight_dl: Weight
    img: Img
    img_dl: Img


def convert2Base64(path):
    img_bytes = Path(path).read_bytes()
    return str(base64.b64encode(img_bytes), encoding='utf-8')

@app.get("/inquirie1")
def test():
    return {
        "returns": convert2Base64("./imgs/inquirie1-1.png"),
        "yields": convert2Base64("./imgs/inquirie1-2.png"),
        "yields_today": 0.8582538402204962
    }


@app.post("/main", response_model=ResposeModel, description="收到请求并返回图片数据(Base64格式)")
def test(request: RequestModel):
    time.sleep(1)
    return {
        "weight": {
            "AMD": 0,
            "AMZN": 0,
            "ZM": 0
        },
        "weight_dl": {
            "AMD": 0,
            "AMZN": 0,
            "ZM": 0
        },
        "img": {
            "weight": convert2Base64("./imgs/weight.png"),
            "AMD": convert2Base64("./imgs/AMD.png"),
            "AMZN": convert2Base64("./imgs/AMZN.png"),
            "ZM": convert2Base64("./imgs/ZM.png")
        },
        "img_dl": {
            "weight": convert2Base64("./imgs/weight_dl.png"),
            "AMD": convert2Base64("./imgs/AMD_dl.png"),
            "AMZN": convert2Base64("./imgs/AMZN_dl.png"),
            "ZM": convert2Base64("./imgs/ZM_dl.png")
        }
    }


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
