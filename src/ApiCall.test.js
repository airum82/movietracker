import * as ApiCall from './ApiCall';
import { apiKey } from './apiKey';
import { recentMovies } from './cleaner';

describe('fetchNowPlaying', () => {


  it('should call fetch with correct params', async () => {
    const mockArray = { results: [{}, {}] };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      { json: () => Promise.resolve(mockArray)
      })
    );
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    await ApiCall.fetchNowPlaying(url);
    expect(window.fetch).toHaveBeenCalledWith(url);
  });

  it('should return an array of movie Objects', async () => {
    jest.mock('./cleaner')
    const mockArray = { results: [{}, {}] };
    const expectedOutput = [{}, {}];
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      { json: () => Promise.resolve(mockArray)
      })
    );
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    const result = await ApiCall.fetchNowPlaying();
    expect(result).toEqual(expectedOutput);
  });
});

describe('addNewUser', () => {

  it('should call fetch with correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    })
    );
    const mockNewUserInfo = { name: 'asdfas', password: 'asdfasdf', email: 'asdfasdf'};
    const fetchArgs = ["http://localhost:3000/api/users/new", 
      {"body": "{\"name\":\"asdfas\",\"password\":\"asdfasdf\",\"email\":\"asdfasdf\"}", 
       "headers": {"Content-Type": "application/json"}, 
       "method": "POST"}];
    await ApiCall.addNewUser(mockNewUserInfo);
    expect(window.fetch).toHaveBeenCalledWith(...fetchArgs);
  });

  it('should return new user message', async () => {
    const expectedOutput = {status: "success", message: "New user created", id: 4};
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(expectedOutput)
      })
    );
    const fetchArgs = ["http://localhost:3000/api/users/new", 
      {"body": "{\"name\":\"asdfas\",\"password\":\"asdfasdf\",\"email\":\"asdfasdf\"}", 
       "headers": {"Content-Type": "application/json"}, 
       "method": "POST"}];
    const result = await ApiCall.addNewUser(fetchArgs);
    expect(result.message).toEqual(expectedOutput.message);
  });
});

describe('checkForUser', () => {

  it('should call fetch with correct params', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const mockUser = { 
      name: 'Kate',
      password: 'katekate',
      email: 'kate@kate.com'
    }
    const url = 'http://localhost:3000/api/users';
    const mockOptionsObj = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockUser)
    }
    ApiCall.checkForUser(mockUser);
    expect(window.fetch).toHaveBeenCalledWith(url, mockOptionsObj);
  })
  it('should return user data if successful', async () => {
    const url = 'http://localhost:3000/api/users';
    const mockUser = {
      password: 'katekate',
      email: 'kate@kate.com'    
    }
    const mockOptionsObj = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockUser)
    }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockUser)
    }));
    const result = await ApiCall.checkForUser(mockUser);
    expect(result).toEqual(mockUser);
  })
})