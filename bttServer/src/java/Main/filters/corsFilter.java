package Main.filters;

import java.io.IOException;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class corsFilter implements Filter{
   /**
   * Default constructor.
   */
  public corsFilter() {
    // TODO Auto-generated constructor stub
  }
 
  /**
   * @see Filter#destroy()
   */
  public void destroy() {
    // TODO Auto-generated method stub
  }
 
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
      throws IOException, ServletException {
      System.out.println("hi");
    HttpServletRequest request = (HttpServletRequest) servletRequest;
    System.out.println("CORSFilter HTTP Request: " + request.getMethod());
 
    // Authorize (allow) all domains to consume the content
    
    ((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods","GET, OPTIONS, HEAD, PUT, POST");
    ((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
    ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Credentials","true");

    
    HttpServletResponse resp = (HttpServletResponse) servletResponse;
 
    // For HTTP OPTIONS verb/method reply with ACCEPTED status code -- per CORS handshake
    if (request.getMethod().equals("OPTIONS")) {
      resp.setStatus(HttpServletResponse.SC_ACCEPTED);
      return;
    }
 
    // pass the request along the filter chain
    chain.doFilter(request, servletResponse);
  }
 
  /**
   * @see Filter#init(FilterConfig)
   */
  public void init(FilterConfig fConfig) throws ServletException {
    // TODO Auto-generated method stub
  }
}
