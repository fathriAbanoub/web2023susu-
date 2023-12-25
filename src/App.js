// src/App.js
import React, { useState, useEffect } from 'react';
import { Layout, Input, List, Card, Button, Modal, Form, Input as AntInput, Select } from 'antd';
import movieData from './db.json'; // Update the path accordingly

const { Content, Sider } = Layout;
const { Search } = Input;
const { Option } = Select;

const App = () => {
  // State for all movies and filtered movies
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  // State for search text, modal visibility, selected movie, and forms
  const [searchText, setSearchText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterForm] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    // Fetch data directly from imported JSON file on component mount
    const fetchedMovies = movieData.movies;
    setAllMovies(fetchedMovies);
    setFilteredMovies(fetchedMovies);
  }, []);

  // Handle search input
  const handleSearch = (value) => {
    setSearchText(value);
    filterMovies(value);
  };

  // Filter movies based on search criteria
  const filterMovies = (search) => {
    if (search) {
      const filtered = filteredMovies.filter((movie) => {
        // Convert movie ID to string for case-insensitive search
        const id = String(movie.id).toLowerCase();
        return (
          id.includes(search.toLowerCase()) ||
          movie.title.toLowerCase().includes(search.toLowerCase()) ||
          movie.genres.some((genre) => genre.toLowerCase().includes(search.toLowerCase()))
        );
      });
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(allMovies);
    }
  };

  // Handle edit button click
  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setEditModalVisible(true);
    // Set form fields with selected movie details
    editForm.setFieldsValue({
      title: movie.title,
      description: movie.plot,
      imageLink: movie.posterUrl,
      genres: movie.genres,
    });
  };

  // Handle edit modal OK button click
  const handleEditModalOk = () => {
    // Update the movie in the state
    const updatedMovies = allMovies.map((movie) =>
      movie.id === selectedMovie.id
        ? {
            ...movie,
            plot: editForm.getFieldValue('description'),
            posterUrl: editForm.getFieldValue('imageLink'),
            genres: editForm.getFieldValue('genres'),
          }
        : movie
    );

    setAllMovies(updatedMovies);
    // Refilter movies based on search text
    setFilteredMovies(updatedMovies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase())));
    setEditModalVisible(false);
  };

  // Handle edit modal cancel button click
  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  // Handle filter modal OK button click
  const handleFilterModalOk = () => {
    // Apply filters to the movies
    const filters = filterForm.getFieldsValue();
    const filtered = allMovies.filter((movie) => {
      return (
        (!filters.genres || filters.genres.every((genre) => movie.genres.includes(genre))) &&
        (!filters.actors || movie.actors.toLowerCase().includes(filters.actors.toLowerCase())) &&
        (!filters.year || movie.year === filters.year) &&
        (!filters.runtime || movie.runtime === filters.runtime) &&
        (!filters.director || movie.director.toLowerCase().includes(filters.director.toLowerCase()))
      );
    });

    setFilteredMovies(filtered);
    setFilterModalVisible(false);
  };

  // Handle filter modal cancel button click
  const handleFilterModalCancel = () => {
    setFilterModalVisible(false);
  };

  // Render edit button for a movie
  const renderEditButton = (movie) => (
    <Button type="primary" onClick={() => handleEdit(movie)}>
      Edit
    </Button>
  );

  // Copy movie ID to clipboard
  const copyMovieId = (id) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={300} style={{ background: '#fff' }}>
        {/* Search input and filter button */}
        <Search
          placeholder="Search by title, ID, or genre"
          onSearch={handleSearch}
          style={{ margin: '16px' }}
        />
        <Button type="primary" onClick={() => setFilterModalVisible(true)} style={{ margin: '16px' }}>
          Filter
        </Button>
        {/* Display filtered movies */}
        {(searchText || filterForm.isFieldsTouched()) && (
          <List
            dataSource={filteredMovies}
            renderItem={(movie) => (
              <List.Item>
                {/* Display movie details */}
                <Card title={movie.title} style={{ width: '100%' }}>
                  <p>ID: {movie.id}</p>
                  <p>Year: {movie.year}</p>
                  <p>Runtime: {movie.runtime} minutes</p>
                  <p>Genres: {movie.genres.join(', ')}</p>
                  <p>Director: {movie.director}</p>
                  <p>Actors: {movie.actors}</p>
                  <p>Plot: {movie.plot}</p>
                  {/* Edit and copy ID buttons */}
                  {renderEditButton(movie)}
                  <Button type="primary" onClick={() => copyMovieId(movie.id)}>
                    Copy Movie ID
                  </Button>
                  {/* Display movie poster */}
                  <img src={movie.posterUrl} alt={movie.title} style={{ maxWidth: '100%' }} />
                </Card>
              </List.Item>
            )}
          />
        )}
      </Sider>
      {/* Main content layout */}
      <Layout>
        <Content style={{ margin: '16px' }}>
          <h1>All Movies</h1>
          {/* Display filtered movies */}
          <List
            dataSource={filteredMovies}
            renderItem={(movie) => (
              <List.Item>
                {/* Display movie details */}
                <Card title={movie.title} style={{ width: '100%' }}>
                  <p>ID: {movie.id}</p>
                  <p>Year: {movie.year}</p>
                  <p>Runtime: {movie.runtime} minutes</p>
                  <p>Genres: {movie.genres.join(', ')}</p>
                  <p>Director: {movie.director}</p>
                  <p>Actors: {movie.actors}</p>
                  <p>Plot: {movie.plot}</p>
                  {/* Edit and copy ID buttons */}
                  {renderEditButton(movie)}
                  <Button type="primary" onClick={() => copyMovieId(movie.id)}>
                    Copy Movie ID
                  </Button>
                  {/* Display movie poster */}
                  <img src={movie.posterUrl} alt={movie.title} style={{ maxWidth: '100%' }} />
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
      {/* Edit Movie Modal */}
      <Modal
        title="Edit Movie"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        {/* Edit movie form */}
        <Form form={editForm} initialValues={{ genres: selectedMovie?.genres }}>
          <Form.Item label="Title">
            <AntInput value={selectedMovie?.title} disabled />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <AntInput.TextArea />
          </Form.Item>
          <Form.Item label="Image Link" name="imageLink">
            <AntInput />
          </Form.Item>
          <Form.Item label="Genres" name="genres">
            <Select mode="tags" placeholder="Select genres">
              {movieData.genres.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      {/* Filter Movie Modal */}
      <Modal
        title="Filter Movies"
        visible={filterModalVisible}
        onOk={handleFilterModalOk}
        onCancel={handleFilterModalCancel}
      >
        {/* Filter movies form */}
        <Form form={filterForm}>
          <Form.Item label="Genres" name="genres">
            <Select mode="multiple" placeholder="Select genres">
              {movieData.genres.map((genre) => (
                <Option key={genre} value={genre}>
                  {genre}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Actors" name="actors">
            <AntInput />
          </Form.Item>
          <Form.Item label="Year" name="year">
            <AntInput type="number" />
          </Form.Item>
          <Form.Item label="Runtime" name="runtime">
            <AntInput type="number" />
          </Form.Item>
          <Form.Item label="Director" name="director">
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default App;
