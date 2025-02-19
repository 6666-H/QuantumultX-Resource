import os
import requests
import datetime
from datetime import timedelta
import git
from pathlib import Path
import json

# 配置项
REPO_PATH = "Scripts"  
OUTPUT_FILE = "merged_scripts.json"
README_PATH = "README.md"

# JSON 源列表
JSON_SOURCES = {
    "XiaoMaoAutoTask": "https://raw.githubusercontent.com/xiaomaoJT/QxScript/main/rewrite/boxJS/XiaoMaoAutoTask.json",
    "SliverkissGallery": "https://github.arka.us.kg/Sliverkiss/waf/main/sliverkiss.gallery.json", 
    "YFamily": "https://whatshub.top/rewrite/yfamily.json"
}

def get_beijing_time():
    """获取北京时间"""
    utc_now = datetime.datetime.utcnow()
    beijing_time = utc_now + timedelta(hours=8)
    return beijing_time

def setup_directory():
    """创建必要的目录"""
    Path(REPO_PATH).mkdir(parents=True, exist_ok=True)

def download_and_merge_json():
    """下载并合并 JSON 数据"""
    beijing_time = get_beijing_time()
    
    # 创建基础结构
    merged_data = {
        "name": "自建任务合集",
        "description": "二十年没去过星巴克的自建任务集",
        "task": []
    }
    
    # 下载和处理 JSON
    for name, url in JSON_SOURCES.items():
        try:
            print(f"Downloading JSON from {name}...")
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            json_data = response.json()
            
            # 如果源数据包含 task 数组,则合并
            if "task" in json_data and isinstance(json_data["task"], list):
                merged_data["task"].extend(json_data["task"])
            
        except Exception as e:
            print(f"Error downloading {name}: {str(e)}")
    
    # 去重任务列表(基于完整字符串比较)
    merged_data["task"] = list(dict.fromkeys(merged_data["task"]))
    
    # 写入合并后的文件
    output_path = os.path.join(REPO_PATH, OUTPUT_FILE)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully merged {len(merged_data['task'])} tasks to {OUTPUT_FILE}")
    return len(merged_data["task"])

def update_readme(task_count):
    """更新 README.md"""
    beijing_time = get_beijing_time()
    content = f"""# 自动任务合集

## 更新时间
{beijing_time.strftime('%Y-%m-%d %H:%M:%S')} (北京时间)

## 说明
自建任务合集
当前任务数量：{task_count}

## 数据来源
{chr(10).join([f'- {name}: {url}' for name, url in JSON_SOURCES.items()])}

## 使用方法
JSON文件地址: https://raw.githubusercontent.com/[你的用户名]/[仓库名]/main/Scripts/{OUTPUT_FILE}
"""
    
    with open(os.path.join(REPO_PATH, README_PATH), 'w', encoding='utf-8') as f:
        f.write(content)

def git_push():
    """提交更改到 Git"""
    try:
        repo = git.Repo(REPO_PATH)
        repo.git.add(all=True)
        beijing_time = get_beijing_time()
        repo.index.commit(f"Update tasks: {beijing_time.strftime('%Y-%m-%d %H:%M:%S')} (北京时间)")
        origin = repo.remote(name='origin')
        origin.push()
        print("Successfully pushed to repository")
    except Exception as e:
        print(f"Error pushing to repository: {str(e)}")

def main():
    setup_directory()
    task_count = download_and_merge_json()
    update_readme(task_count)
    git_push()

if __name__ == "__main__":
    main()
