import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    public httpclient: HttpClient,
    public router: Router,
    public title: Title) { }

  /**
   * Get data call
   * @param url API url
   */
  getData(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  /**
   * Put data call
   * @param url API url
   * @param data Data to be send
   */
  putData(url, data) {
    return this.httpclient.put<any>(url, data, { observe: 'response' }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  /**
   * Put data call
   * @param url API url

   */
  getTotalBlog(url) {
    return this.httpclient.get<any>(url, { observe: 'response' }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  /**
   * Post data call
   * @param data Data to be send
   * @param url API url
   */
  postData(url, data) {
    return this.httpclient.post<any>(url, data, { observe: 'response' }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  /**
   * Delete Data call
   * @param url API url
   */
  deleteData(url) {
    return this.httpclient.delete<any>(url, { observe: 'response' }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  deleteDataWithPayload(url, payload) {
    return this.httpclient.delete<any>(url, { observe: 'response', params: payload }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  /**
   * Patch Data call
   * @param url API url
   */
  patchData(url, data) {
    return this.httpclient.patch<any>(url, data, { observe: 'response' }).pipe(
      catchError((error) => {
        return this.errorHandlerFunc(error);
      }));
  }

  /**
   * Error handling method
   * @param error Error
   */
  errorHandlerFunc(error) {
    return throwError(error || 'Server Error');
  }

  /**
   * To update page title
   * @param page Page data
   */
  updatePageTitle(page) {
    this.title.setTitle(page);
    window.print();
    this.title.setTitle('Premier Agent Network');
  }
  /**
   * Get data call
   * @param url API url
   */

   
  getBlog(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  getCommunity(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  /**
   * Get data call
   * @param url API url
   */

   
  getTags(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

   /**
   * Get data call
   * @param url API url
   * * @param data
   */
  postTags(url,data) {
    return this.httpclient.post<any>(url,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }


  /**
   * Get data call
   * @param url API url
   * * @param id API url
   */
  getBlogDetail(url,id) {
    return this.httpclient.get<any>(`${url}` + id).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  getEditBlogDetail(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  getTagDetail(url,id) {
    return this.httpclient.get<any>(`${url}` + id).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  getopenhouseDetail(url,id) {
    return this.httpclient.get<any>(`${url}` + id).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }


  deleteTag(url) {
    return this.httpclient.delete<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  putTagUpdate(url,data) {
    return this.httpclient.put<any>(url,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }
  
  
  deleteBlog(url) {
    return this.httpclient.delete<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }


  /**
   * Get data call
   * @param postUrl API url
   * * @param data API url
   */
  postBlog(postUrl,data) {
    return this.httpclient.post<any>(postUrl,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  createNewBlog(postUrl,data) {
    return this.httpclient.post<any>(postUrl,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  postBlogUpdate(url,data) {
    return this.httpclient.put<any>(url,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

 
  getCommmentDetail(postUrl,data) {
    return this.httpclient.post<any>(postUrl,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }
  getBlogCommmentDetail(postUrl,data) {

    return this.httpclient.post<any>(postUrl,data).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

  getCommentIDDetails(url) {
    return this.httpclient.get<any>(url).pipe(catchError((error) => {
      return this.errorHandlerFunc(error);
    }));
  }

}
