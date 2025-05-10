---
- name: Install Nginx on webservers
  hosts: webservers
  become: yes  # Run tasks as sudo
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Install Nginx
      apt:
        name: nginx
        state: present

    - name: Start Nginx service
      service:
        name: nginx
        state: started
        enabled: yes

 sudo apt update
 sudo apt install ansible
sudo gedit /etc/ansible/hosts
nano install_nginx.yml
ansible-playbook -i hosts.ini install_nginx.yml
