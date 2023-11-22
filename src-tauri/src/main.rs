// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path;
use std::env;
use std::fs;

use serde_json::json;

use sysinfo::{System, SystemExt, DiskExt};

use home;

#[tauri::command]
fn get_disks() -> serde_json::Value {
    let mut system = System::new();
    system.refresh_all();

    let mut disks: Vec<serde_json::Value> = Vec::new();
    for disk in system.disks() {
        let disk_json = json!({
            "name": disk.name(),
            "total_space": disk.total_space(),
            "available_space": disk.available_space(),
        });
        disks.push(disk_json);
    }

    if disks.len() == 0 {
        match home::home_dir() {
            Some(path) => {
                let disk_json = json!({
                    "name": path.to_str().unwrap(),
                    "total_space": 0,
                    "available_space": 0,
                });
                disks.push(disk_json);
            }
            None => panic!("Unable to get your home dir!"),
        }
    }

    json!(disks)
}

#[tauri::command]
fn get_folder_data(path: &str, depth: u16) -> serde_json::Value {
    let mut folder_data = json!({
        "name": path,
        "type": "folder",
        "children": [],
    });

    if depth > 0 {
        let mut children: Vec<serde_json::Value> = Vec::new();
        let paths = std::fs::read_dir(path).expect("Failed to read directory");
        for path in paths {
            let path = path.unwrap().path();
            let path_str = path.to_str().unwrap();
            let mut child = json!({
                "name": path_str,
                "type": "file",
            });
            if path.is_dir() {
                child["type"] = "folder".into();
                child["children"] = get_folder_data(path_str, depth - 1)["children"].clone();
            }
            children.push(child);
        }
        folder_data["children"] = json!(children);
    }

    return folder_data;
}

#[tauri::command]
fn get_base() -> path::PathBuf {
    let mut base: path::PathBuf = path::PathBuf::new();
    base.push(".rusty-files");

    // make sure base exists. If not, create it
    if !base.exists() {
        println!("Creating base directory: {:?}", base);
        fs::create_dir_all(&base).expect("Failed to create base directory");
        fs::File::create(base.join("test.txt")).expect("Failed to create test file");
    }
    base
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_disks,
            get_folder_data,
            get_base,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
