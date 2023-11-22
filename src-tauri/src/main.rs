// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path;
use std::env;

fn get_base() -> path::PathBuf {
    let mut base: path::PathBuf = path::PathBuf::new();
    if env::consts::OS == "windows" {
        // windows is C:/.rusty-base
        base.push("C:\\.rusty-base");
    } else {
        // mac and linux is ~/.rusty-base
        base.push("~/.rusty-base");
    }

    // make sure base exists. If not, create it
    if !base.exists() {
        std::fs::create_dir_all(&base).expect("Failed to create base directory");
    }
    base
}

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
