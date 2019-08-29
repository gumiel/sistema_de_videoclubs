<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Category extends CI_Controller {

	protected $ci;

	public function __construct()
	{
		parent::__construct();
		$this->ci =& get_instance();
		
	}

	public function index()
	{
		
	}

	public function list()
	{
		$dataRes = array();
		$query = $this->db->get('category');
		$data = $query->result();
		$dataRes['result'] = 1;
		$dataRes['categorys'] = $data;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function get()
	{
		$category = $this->input->post('category');
		
		$data = array();
		$this->db->where('category_id', $category['category_id']);
		$query = $this->db->get('category');
		$data = $query->row();

		$dataRes['result'] = 1;
		$dataRes['category'] = $data;

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function insert()
	{
		$category = $this->input->post('category');
		$data = array();
		
		$this->db->insert('category', $category);
		$dataRes['result'] = 1;		

		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function edit()
	{
		$category = $this->input->post('category');
		$data = array();
		
		$this->db->where('category_id', $category['category_id']);
		$this->db->update('category', $category);
		$dataRes['result'] = 1;		
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

	public function delete()
	{
		$category = $this->input->post('category');
		$data = array();
		
		$this->db->where('category_id', $category['category_id']);		
		$this->db->delete('category');
		$dataRes['result'] = 1;
		
		$this->ci->output
        ->set_status_header(200)
        ->set_content_type('application/json', 'utf-8')
        ->set_output(json_encode($dataRes, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES))
        ->_display();
		exit;
	}

}

/* End of file Category.php */
/* Location: ./application/controllers/Category.php */